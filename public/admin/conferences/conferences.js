const urlBase = "https://mtsiw.duckdns.org/pwa";
let isNew = true;

window.onload = () => {
    // References to HTML objects
    const tblConferences = document.getElementById("tblConferences");
    const tblSpeakers = document.getElementById("tblSpeakers");
    const tblSponsors = document.getElementById("tblSponsors");
    const tblParticipants = document.getElementById("tblParticipants");

    const tabConference = document.getElementById("nav-conference-tab");
    const tabSpeakers = document.getElementById("nav-speakers-tab");
    const tabSponsors = document.getElementById("nav-sponsors-tab");
    const tabParticipants = document.getElementById("nav-participants-tab");

    const frmConference = document.getElementById("frmConference");

    frmConference.addEventListener("reset", async (event) => {
        isNew = true;

        // Hide speakers tab link
        tabSpeakers.classList.add('invisible');
        tabSpeakers.classList.remove('visible');

        // Hide sponsors tab link
        tabSponsors.classList.add('invisible');
        tabSponsors.classList.remove('visible');

        // Hide participants tab link
        tabParticipants.classList.add('invisible');
        tabParticipants.classList.remove('visible');
    });

    frmConference.addEventListener("submit", async (event) => {
        event.preventDefault();
        const txtNome = document.getElementById("txtNome").value;
        const txtAcronimo = document.getElementById("txtAcronimo").value;
        const txtDescricao = document.getElementById("txtDescricao").value;
        const txtLocal = document.getElementById("txtLocal").value;
        const txtData = document.getElementById("txtData").value;
        const txtConferenceId = document.getElementById("txtConferenceId").value;

        try {
            // Verifica flag isNew para saber se se trata de uma adição ou
            // de uma atualização dos dados de uma conferência
            let response;
            let msgBody = `idConference=${txtConferenceId}&nome=${txtNome}&acronimo=${txtAcronimo}&descricao=${txtDescricao}&local=${txtLocal}&data=${txtData}`;
            if (isNew) {
                // Adiciona Conferência
                response = await fetch(`${urlBase}/conferences`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    body: msgBody
                });
            } else {
                // Atualiza Conferência
                response = await fetch(`${urlBase}/conferences/${txtConferenceId}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "PUT",
                    body: msgBody
                });
            }

            let result = await response.json();

            if (result.success == true) {
                frmConference.reset();

                Swal.fire({
                    title: 'Sucesso',
                    text: result.message.pt,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Fechar'
                });
            } else {
                Swal.fire({
                    title: 'Erro',
                    text: result.message.pt,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Fechar'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Erro!',
                text: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Fechar'
            });
        }

        renderConferences();
    })

    const renderConferences = async () => {
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='6'>Lista de Conferências</th></tr>
                <tr class='bg-info'>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Acrónimo</th>
                    <th>Local</th>
                    <th>Data</th>
                    <th class="text-right">Ações</th>
                </tr> 
            </thead><tbody>
        `;
        const response = await fetch(`${urlBase}/conferences`);
        const conferences = await response.json();
        let i = 1
        for (const conference of conferences) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${conference.nome}</td>
                    <td>${conference.acronimo}</td>
                    <td>${conference.local}</td>
                    <td>${conference.data}</td>
                    <td class="text-right">
                        <i id='edit-conference-${conference.idConference}' idconference='${conference.idConference}' class='fas fa-edit edit-conference'></i>
                        <i id='remove-conference-${conference.idConference}' idconference='${conference.idConference}' class='fas fa-trash-alt remove-conference'></i>
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody>";
        tblConferences.innerHTML = strHtml;

        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit-conference")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", function () {
                isNew = false;
                let idConference = this.getAttribute('idconference');
                for (const conference of conferences) {
                    if (conference.idConference == idConference) {
                        document.getElementById("txtConferenceId").value = conference.idConference
                        document.getElementById("txtNome").value = conference.nome
                        document.getElementById("txtAcronimo").value = conference.acronimo
                        document.getElementById("txtDescricao").value = conference.descricao
                        document.getElementById("txtLocal").value = conference.local
                        document.getElementById("txtData").value = conference.data

                        renderSpeakers(idConference, conference.nome);
                        renderSponsors(idConference, conference.nome);
                        renderParticipants(idConference, conference.nome);
                    }
                }
            });
        }

        // Gerir o clique no ícone de Remover        
        const btnDelete = document.getElementsByClassName("remove-conference")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", function () {
                let idConference = this.getAttribute("idconference");

                Swal.fire({
                    title: 'Tem a certeza?',
                    text: "Não será possível reverter a remoção!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Remover'
                }).then(async (result) => {
                    if (result.value) {
                        try {
                            const response = await fetch(`${urlBase}/conferences/${idConference}`, {
                                method: "DELETE"
                            });

                            const result = await response.json();

                            if (result.success == true) {
                                Swal.fire({
                                    title: 'Sucesso',
                                    text: result.message.pt,
                                    icon: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Fechar'
                                });
                            } else {
                                Swal.fire({
                                    title: 'Erro',
                                    text: result.message.pt,
                                    icon: 'error',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Fechar'
                                });
                            }
                        } catch (err) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Erro',
                                text: err,
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Fechar'

                            });
                        }
                        renderConferences();
                    }
                });
            });
        }
    }

    const renderSpeakers = async function (idConference, conferenceName) {
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Oradores da Conferência ${conferenceName}</th></tr>
                <tr class='bg-info'>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cargo</th>              
                    <th class="text-right">Participa</th>              
                </tr> 
            </thead><tbody>
        `;
        const response = await fetch(`${urlBase}/speakers/conference/${idConference}`);
        const speakers = await response.json();
        let i = 1;
        for (const speaker of speakers) {
            let checked = '';
            if (speaker.conferences.length > 0) {
                checked = 'checked="checked"';
            }

            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${speaker.nome}</td>
                    <td>${speaker.cargo}</td>
                    <td class="text-right">
                        <input type="checkbox" id='speaker-${speaker.idSpeaker}' idspeaker='${speaker.idSpeaker}' ${checked} class='speaker-goes'>
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody>";
        tblSpeakers.innerHTML = strHtml;

        // Show speakers tab link
        tabSpeakers.classList.add('visible');
        tabSpeakers.classList.remove('invisible');

        // Gerir a participação do orador
        const chkSpeakerGoes = document.getElementsByClassName("speaker-goes");
        for (let i = 0; i < chkSpeakerGoes.length; i++) {
            chkSpeakerGoes[i].addEventListener("click", function () {
                let idSpeaker = this.getAttribute('idspeaker');

                // Add / remove speaker from the conference
                if (this.checked) {
                    fetch(`${urlBase}/conferences/${idConference}/speakers/${idSpeaker}`, {
                        method: "PUT"
                    }).catch((error) => {
                        Swal.fire({
                            title: 'Erro!',
                            text: error,
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Fechar'
                        });
                    });
                } else {
                    fetch(`${urlBase}/conferences/${idConference}/speakers/${idSpeaker}`, {
                        method: "DELETE"
                    }).catch((error) => {
                        Swal.fire({
                            title: 'Erro!',
                            text: error,
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Fechar'
                        });
                    });
                }
            });
        }
    }

    const renderSponsors = async function (idConference, conferenceName) {
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Sponsors da Conferência ${conferenceName}</th></tr>
                <tr class='bg-info'>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Categoria</th>              
                    <th class="text-right">Participa</th>              
                </tr> 
            </thead><tbody>
        `;
        const response = await fetch(`${urlBase}/sponsors/conference/${idConference}`);
        const sponsors = await response.json();
        let i = 1;
        for (const sponsor of sponsors) {
            let checked = '';
            if (sponsor.conferences.length > 0) {
                checked = 'checked="checked"';
            }

            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${sponsor.nome}</td>
                    <td>${sponsor.categoria}</td>
                    <td class="text-right">
                        <input type="checkbox" id='speaker-${sponsor.idSponsor}' idsponsor='${sponsor.idSponsor}' ${checked} class='sponsor-goes'>
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody>";
        tblSponsors.innerHTML = strHtml;

        // Show sponsors tab link
        tabSponsors.classList.add('visible');
        tabSponsors.classList.remove('invisible');

        // Gerir a participação do orador
        const chkSponsorGoes = document.getElementsByClassName("sponsor-goes");
        for (let i = 0; i < chkSponsorGoes.length; i++) {
            chkSponsorGoes[i].addEventListener("click", function () {
                let idSponsor = this.getAttribute('idsponsor');

                // Add / remove sponsor from the conference
                if (this.checked) {
                    fetch(`${urlBase}/conferences/${idConference}/sponsors/${idSponsor}`, {
                        method: "PUT"
                    }).catch((error) => {
                        Swal.fire({
                            title: 'Erro!',
                            text: error,
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Fechar'
                        });
                    });
                } else {
                    fetch(`${urlBase}/conferences/${idConference}/sponsors/${idSponsor}`, {
                        method: "DELETE"
                    }).catch((error) => {
                        Swal.fire({
                            title: 'Erro!',
                            text: error,
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Fechar'
                        });
                    });
                }
            });
        }
    }

    const renderParticipants = async (idConference, conferenceName) => {
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Participantes da Conferência ${conferenceName}</th></tr>
                <tr class='bg-info'>
                    <th>#</th>
                    <th>Nome</th>
                    <th>E-mail</th>              
                    <th class="text-right">Ações</th>              
                </tr> 
            </thead><tbody>
        `;
        const response = await fetch(`${urlBase}/conferences/${idConference}/participants`);
        const participants = await response.json();
        let i = 1;
        for (const participant of participants) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${participant.nomeParticipante}</td>
                    <td>${participant.idParticipant}</td>
                    <td class="text-right">
                    <i id='remove-participant-${participant.idParticipant}' idparticipant='${participant.idParticipant}' class='fas fa-trash-alt remove-participant'></i>
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody>";
        tblParticipants.innerHTML = strHtml;

        // Show participants tab link
        tabParticipants.classList.add('visible');
        tabParticipants.classList.remove('invisible');

        // Manage click delete        
        const btnDelete = document.getElementsByClassName("remove-participant");
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", function () {
                let participantId = this.getAttribute("idparticipant");

                Swal.fire({
                    title: 'Tem a certeza?',
                    text: "Não será possível reverter a remoção!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Remover'
                }).then(async (result) => {
                    if (result.value) {
                        try {
                            const response = await fetch(`${urlBase}/conferences/${idConference}/participants/${participantId}`,
                                {
                                    method: "DELETE"
                                }
                            );
                            const result = await response.json();

                            if (result.success == true) {
                                Swal.fire({
                                    title: 'Removido!',
                                    text: "O participante foi removido da Conferência.",
                                    icon: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Fechar'
                                });
                            }
                        } catch (err) {
                            Swal.fire({
                                title: 'Erro!',
                                text: err,
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Fechar'
                            });
                        }
                        renderParticipants(idConference, conferenceName);
                    }
                });
            });
        }
    }

    frmConference.reset();
    renderConferences();
}