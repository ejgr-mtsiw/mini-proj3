const urlBase = "https://mtsiw.duckdns.org/pwa";
let isNew = true;

window.onload = () => {
    // References to HTML objects   
    const tblSpeakers = document.getElementById("tblSpeakers");
    const frmSpeaker = document.getElementById("frmSpeaker");

    frmSpeaker.addEventListener("submit", async (event) => {
        event.preventDefault();
        const txtName = document.getElementById("txtName").value;
        const txtJob = document.getElementById("txtJob").value;
        const txtPhoto = document.getElementById("txtPhoto").value;
        const txtFacebook = document.getElementById("txtFacebook").value;
        const txtTwitter = document.getElementById("txtTwitter").value;
        const txtLinkedin = document.getElementById("txtLinkedin").value;
        const txtBio = document.getElementById("txtBio").value;
        const txtSpeakerId = document.getElementById("txtSpeakerId").value;

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador
        let response;
        if (isNew) {
            // Adiciona Orador
            response = await fetch(`${urlBase}/conference/1/speakers/`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}&active=1`
            });
            const newSpeakerId = response.headers.get("Location");
            const newSpeaker = await response.json();
            // Associa orador à conferência WebConference
            // const newUrl = `${urlBase}/conference/1/speakers/${newSpeakerId}`
            // const response2 = await fetch(newUrl, {
            //     headers: {
            //         "Content-Type": "application/x-www-form-urlencoded"
            //     },
            //     method: "POST"
            // })
            // const newSpeaker2 = await response2.json()
        } else {
            // Atualiza Orador
            response = await fetch(`${urlBase}/conference/1/speakers/${txtSpeakerId}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "PUT",
                body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}&active=1`
            });

            const newSpeaker = await response.json();
        }
        isNew = true;
        renderSpeakers();
    })

    const renderSpeakers = async () => {
        frmSpeaker.reset()
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Oradores</th></tr>
                <tr class='bg-info'>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cargo</th>              
                    <th class="text-right">Ações</th>              
                </tr> 
            </thead><tbody>
        `
        const response = await fetch(`${urlBase}/conference/1/speakers`)
        const speakers = await response.json()
        let i = 1
        for (const speaker of speakers) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${speaker.nome}</td>
                    <td>${speaker.cargo}</td>
                    <td class="text-right">
                        <i id='${speaker.idSpeaker}' class='fas fa-edit edit'></i>
                        <i id='${speaker.idSpeaker}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblSpeakers.innerHTML = strHtml

        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                isNew = false
                for (const speaker of speakers) {
                    if (speaker.idSpeaker == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtSpeakerId").value = speaker.idSpeaker
                        document.getElementById("txtName").value = speaker.nome
                        document.getElementById("txtJob").value = speaker.cargo
                        document.getElementById("txtPhoto").value = speaker.foto
                        document.getElementById("txtFacebook").value = speaker.facebook
                        document.getElementById("txtTwitter").value = speaker.twitter
                        document.getElementById("txtLinkedin").value = speaker.linkedin
                        document.getElementById("txtBio").value = speaker.bio
                    }
                }
            })
        }

        // Gerir o clique no ícone de Remover        
        const btnDelete = document.getElementsByClassName("remove")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
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
                        let speakerId = btnDelete[i].getAttribute("id")
                        try {
                            const response = await fetch(`${urlBase}/conference/1/speakers/${speakerId}`, {
                                method: "DELETE"
                            });

                            const result = await response.json();

                            if (result.success == true) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Removido!',
                                    text: 'O orador foi removido da conferência.',
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
                        renderSpeakers();
                    }
                });
            });
        }
    }
    renderSpeakers();
}