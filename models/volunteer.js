'use strict';

const data = require('../data/volunteers.json');
const Promise = require('bluebird').getNewLibraryCopy();

/**
 * This volunteer model uses a JSON file as database but emulates a
 * Sequelize object, so later we only need to remove the json code
 * when moving to a true DBMS
 */

module.exports = function (sequelize, DataTypes) {

    let Volunteer = sequelize.define('Volunteer', {
        idVolunteer: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        email: { type: DataTypes.STRING },
        telefone: { type: DataTypes.STRING }
    },
        {
            tableName: 'volunteers.json',
            timestamps: false
        }
    );

    Volunteer.sync = function (options) {
        console.info('Volunteer.sync');
        return Promise.resolve(0);
    }

    Volunteer.init = function (attributes, options = {}) {
        console.info('Volunteer.init');

        options = Object.assign({}, this.options, options);
        options.hooks = options.hooks === undefined ? true : !!options.hooks;

        return Promise.resolve(this);
    }

    /**
     * @returns {Promise<Array<Model>>}
     */
    Volunteer.findAll = function (options) {
        let volunteerList = [];

        console.info('Volunteer.findAll');

        data.forEach(element => {
            volunteerList.push(Volunteer.build(element));
        });

        return Promise.resolve(volunteerList);
    }

    /**
     * Validate this instance, and if the validation passes, persist it to the database. It will only save changed fields, and do nothing if no fields have changed.
     *
     * On success, the callback will be called with this instance. On validation error, the callback will be called with an instance of `Sequelize.ValidationError`.
     * This error will have a property for each of the fields for which validation failed, with the error message for that field.
     *
     * @param {Object}      [options] save options
     * @param {string[]}    [options.fields] An optional array of strings, representing database columns. If fields is provided, only those columns will be validated and saved.
     * @param {boolean}     [options.silent=false] If true, the updatedAt timestamp will not be updated.
     * @param {boolean}     [options.validate=true] If false, validations won't be run.
     * @param {boolean}     [options.hooks=true] Run before and after create / update + validate hooks
     * @param {Function}    [options.logging=false] A function that gets executed while running the query to log the sql.
     * @param {Transaction} [options.transaction] Transaction to run query under
     * @param {string}      [options.searchPath=DEFAULT] An optional parameter to specify the schema search_path (Postgres only)
     * @param {boolean}     [options.returning] Append RETURNING * to get back auto generated values (Postgres only)
     *
     * @returns {Promise<Model>}
     */
    Volunteer.save = function (options) {
        console.info('Volunteer.save');

        options = Utils.cloneDeep(options);
        options = _.defaults(options, {
            hooks: true,
            validate: true
        });

        if (!options.fields) {
            if (this.isNewRecord) {
                options.fields = Object.keys(this.constructor.rawAttributes);
            } else {
                options.fields = _.intersection(this.changed(), Object.keys(this.constructor.rawAttributes));
            }

            options.defaultFields = options.fields;
        }

        if (options.returning === undefined) {
            if (options.association) {
                options.returning = false;
            } else if (this.isNewRecord) {
                options.returning = true;
            }
        }

        const primaryKeyName = this.constructor.primaryKeyAttribute;
        const primaryKeyAttribute = primaryKeyName && this.constructor.rawAttributes[primaryKeyName];
        const createdAtAttr = this.constructor._timestampAttributes.createdAt;
        const versionAttr = this.constructor._versionAttribute;
        const hook = this.isNewRecord ? 'Create' : 'Update';
        const wasNewRecord = this.isNewRecord;
        const now = Utils.now(this.sequelize.options.dialect);
        let updatedAtAttr = this.constructor._timestampAttributes.updatedAt;

        if (updatedAtAttr && options.fields.length >= 1 && !options.fields.includes(updatedAtAttr)) {
            options.fields.push(updatedAtAttr);
        }
        if (versionAttr && options.fields.length >= 1 && !options.fields.includes(versionAttr)) {
            options.fields.push(versionAttr);
        }

        if (options.silent === true && !(this.isNewRecord && this.get(updatedAtAttr, { raw: true }))) {
            // UpdateAtAttr might have been added as a result of Object.keys(Model.rawAttributes). In that case we have to remove it again
            _.remove(options.fields, val => val === updatedAtAttr);
            updatedAtAttr = false;
        }

        if (this.isNewRecord === true) {
            if (createdAtAttr && !options.fields.includes(createdAtAttr)) {
                options.fields.push(createdAtAttr);
            }

            if (primaryKeyAttribute && primaryKeyAttribute.defaultValue && !options.fields.includes(primaryKeyName)) {
                options.fields.unshift(primaryKeyName);
            }
        }

        if (this.isNewRecord === false) {
            if (primaryKeyName && this.get(primaryKeyName, { raw: true }) === undefined) {
                throw new Error('You attempted to save an instance with no primary key, this is not allowed since it would result in a global update');
            }
        }

        if (updatedAtAttr && !options.silent && options.fields.includes(updatedAtAttr)) {
            this.dataValues[updatedAtAttr] = this.constructor._getDefaultTimestamp(updatedAtAttr) || now;
        }

        if (this.isNewRecord && createdAtAttr && !this.dataValues[createdAtAttr]) {
            this.dataValues[createdAtAttr] = this.constructor._getDefaultTimestamp(createdAtAttr) || now;
        }

        return Promise.try(() => {
            // Validate
            if (options.validate) {
                return this.validate(options);
            }
        }).then(() => {
            // Run before hook
            if (options.hooks) {
                const beforeHookValues = _.pick(this.dataValues, options.fields);
                let ignoreChanged = _.difference(this.changed(), options.fields); // In case of update where it's only supposed to update the passed values and the hook values
                let hookChanged;
                let afterHookValues;

                if (updatedAtAttr && options.fields.includes(updatedAtAttr)) {
                    ignoreChanged = _.without(ignoreChanged, updatedAtAttr);
                }

                return this.constructor.runHooks(`before${hook}`, this, options)
                    .then(() => {
                        if (options.defaultFields && !this.isNewRecord) {
                            afterHookValues = _.pick(this.dataValues, _.difference(this.changed(), ignoreChanged));

                            hookChanged = [];
                            for (const key of Object.keys(afterHookValues)) {
                                if (afterHookValues[key] !== beforeHookValues[key]) {
                                    hookChanged.push(key);
                                }
                            }

                            options.fields = _.uniq(options.fields.concat(hookChanged));
                        }

                        if (hookChanged) {
                            if (options.validate) {
                                // Validate again

                                options.skip = _.difference(Object.keys(this.constructor.rawAttributes), hookChanged);
                                return this.validate(options).then(() => {
                                    delete options.skip;
                                });
                            }
                        }
                    });
            }
        }).then(() => {
            if (!options.fields.length) return this;
            if (!this.isNewRecord) return this;
            if (!this._options.include || !this._options.include.length) return this;

            // Nested creation for BelongsTo relations
            return Promise.map(this._options.include.filter(include => include.association instanceof BelongsTo), include => {
                const instance = this.get(include.as);
                if (!instance) return Promise.resolve();

                const includeOptions = _(Utils.cloneDeep(include))
                    .omit(['association'])
                    .defaults({
                        transaction: options.transaction,
                        logging: options.logging,
                        parentRecord: this
                    }).value();

                return instance.save(includeOptions).then(() => this[include.association.accessors.set](instance, { save: false, logging: options.logging }));
            });
        }).then(() => {
            const realFields = options.fields.filter(field => !this.constructor._virtualAttributes.has(field));
            if (!realFields.length) return this;
            if (!this.changed() && !this.isNewRecord) return this;

            const versionFieldName = _.get(this.constructor.rawAttributes[versionAttr], 'field') || versionAttr;
            let values = Utils.mapValueFieldNames(this.dataValues, options.fields, this.constructor);
            let query = null;
            let args = [];
            let where;

            if (this.isNewRecord) {
                query = 'insert';
                args = [this, this.constructor.getTableName(options), values, options];
            } else {
                where = this.where(true);
                if (versionAttr) {
                    values[versionFieldName] = parseInt(values[versionFieldName], 10) + 1;
                }
                query = 'update';
                args = [this, this.constructor.getTableName(options), values, where, options];
            }

            if (query == 'insert') {
                console.info('Doing fake insert!');

                result = SpeakerJSON.build(
                    {
                        "idSpeaker": 1,
                        "nome": "rq",
                        "filiacao": null,
                        "bio": null,
                        "foto": null,
                        "link": null,
                        "idSpeakerTipo": 1,
                        "active": 1,
                        "facebook": null,
                        "linkedin": null,
                        "twitter": null,
                        "cargo": "xx"
                    }
                );

                return result;
                /*
                for (const field of options.fields) {
                    result._previousDataValues[field] = result.dataValues[field];
                    this.changed(field, false);
                }
                this.isNewRecord = false;

                */
                return result;
            } else {
                console.info('Doing fake update!');

                result = build(
                    {
                        "idSpeaker": 1,
                        "nome": "rq",
                        "filiacao": null,
                        "bio": null,
                        "foto": null,
                        "link": null,
                        "idSpeakerTipo": 1,
                        "active": 1,
                        "facebook": null,
                        "linkedin": null,
                        "twitter": null,
                        "cargo": "xx"
                    }
                );

                return result;
            }
        });
    }

    return Volunteer;
}
