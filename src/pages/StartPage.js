/*

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/pages.

    2. Copie o arquivo "easter-egg.png" para a pasta assets.

    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". 
       Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. 
       Faça com que o componente StartPage seja carregado pelo novo Route. Dessa forma, 
       o componente será exibido logo no início.

    4. No componente StartPage, crie uma variável de 
    estado de objeto contendo duas propriedades:
        - about (valor inicial: string vazia)
        - imgVisible (valor inicial: false)
       Crie também as respectivas variáveis avulsas 
       usando desestruturação.
    
    5. Dentro da função fetchData(), no local indicado, 
        atualize a variável de estado
       com o valor retornado em response.data.

    6. Crie um hook useEffect que seja executado apenas durante 
    a fase de montagem do
       componente e, dentro dele, efetue uma chamada à função 
       fetchData().

    7. Faça as modificações necessárias na tag <img> para que a 
    imagem "easter-egg.png" seja exibida.

    8. Ao clicar no botão que está dentro da toolbar, a 
    propriedade da variável de estado
       "imgVisible" deve inverter seu valor (ou seja, de 
        true para false ou de false para true).
       Dessa forma, a imagem da div logo abaixo será exibida 
       se estiver oculta, e será ocutada 
       se estiver sendo exibida. Veja as imagens 
       RESULTADO1.png e RESULTADOO2.png para referência.

    9. Comente o código-fonte, explicando o respectivo 
    funcionamento.

    10. Coloque os arquivos "App.js" e "StartPage.js" em um 
    ZIP para fazer a entrega da prova.

*/

import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import api from '../lib/api'
import image from '../assets/easter-egg.png'

export default function StartPage() {

    /* Variável de estado com as propriedades about e imgVisible
    essa segunda sendo a responsável por armazer um valor booleano
    definindo se a imagem está visível ou não. */
    const [state, setState] = React.useState({
        about: '',
        imgVisible: false  
    });

    // Variáveis avulsas criadas a partir da desestruturação
    const {about, imgVisible} = state

    /* useEffect() com vetor de depêndencias vazio para ser execurado
    apenas uma vez no momento da montagem do componente */

    React.useEffect(() => {
        // Buscando os dados da API e armazenando na propriedade about
        fetchData()
      }, []) 

    async function fetchData(newState = state) {
        try {
            const response = await api.get('/sobre/1')
            /* Atualize aqui o campo about da variável de estado
               com o valor de response.data */

            // Atualizando o valor do campo about da variável de estado 
            setState({...newState, about : response.data}) 
        }
        catch(erro) {
            alert('ERRO: ' + erro.message)
        }
    }

    // Função que é chamada quando ocorre um clique no botão
    function handleClick(newState = state){
        let img = imgVisible
        if(img){
            setState({...newState, imgVisible : false})
        }
        else{
            setState({...newState, imgVisible : true})
        }
        //console.log(img)
    }

    return (

        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{__html: about.info}} />

            <Box sx={{ textAlign: 'center' }}>
                <Toolbar sx={{ justifyContent: 'space-around' }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            /* Inverta aqui o valor do campo imgVisible
                               da variável de estado */
                            handleClick()
                        }}
                    >
                        Surpresa!
                    </Button>
                </Toolbar>
                <img src={image} alt="Carros antigos" style={{
                    display: 'block',
                    margin: '0 auto',
                    transition: 'opacity 1s linear',
                    opacity: imgVisible ? '1' : '0', 
                    height: imgVisible ? '591px': '0'
                }} />
            </Box>
        </>
    )
}