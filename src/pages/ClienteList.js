import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import api from "../lib/api"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '../ui/ConfirmDialog';
import Notification from '../ui/Notification';

// Exportação da função ClientList para ser mostrado a listagem de clientes na página
export default function ClienteList() {
    // Criação de um Array com todas as colunas que terão na tabela
    const columns = [
      { 
        field: 'nome', 
        headerName: 'Nome',
        headerAlign: 'center',
        width: 200 
      },
      {
        field: 'cpf',
        headerName: 'CPF',
        width: 150,
        headerAlign: 'center',
        align: 'center',  
      },
      {
        field: 'municipio',
        headerName: 'Municipio-UF',
        width: 200,
        headerAlign: 'center',  // Alinhamento do cabeçalho
        align: 'center',        // Alinhamento da célula de dados  
        // Concatenando as informações demunicípio e uf na mesma coluna
        valueGetter: params => params.row.municipio + '/' + params.row.uf
      },
      {
        field: 'telefone',
        headerName: 'Telefone', 
        width: 130,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'email',
        headerName: 'Email',   
        width: 220,
        headerAlign: 'center', 
        align: 'center',  
      },
      {
        field: 'editar',
        headerName: 'Editar',
        headerAlign: 'center',
        align: 'center',
        width: 90,
        // aria é para leitores de tela para pessoas con deficiencia visual
        renderCell: params => (
          <IconButton aria-label='Editar'>
            <EditIcon/>
          </IconButton>
        )
      },
      {
        field: 'excluir',
        headerName: 'Excluir',
        headerAlign: 'center',
        align: 'center',
        width: 90,
        renderCell: params => (
          <IconButton aria-label='Excluir' onClick={() => handleDeleteClick(params.id)}>
            <DeleteForeverIcon color="error"/>
          </IconButton>
        )
      },
    ];

    // Criação da variável de estado
    const [state, setState] = React.useState({
      clientes: [], // Vetor vazio
      deleteId: null, // id do registro a ser excluido
      dialogOpen: false, // se o dialogo de confirmação está aberto ou não
      notifSeverity: '', // Severidade da notificação
      notifMessage: '', // Mensagem de notificação     
    })
    const {clientes, deleteId, dialogOpen, notifSeverity, notifMessage} = state

    function handleDeleteClick(id){
      setState({
        ...state,
        deleteId: id,
        dialogOpen: true
      })
    }
 
    React.useEffect(() => {
        // Buscar os dados da API remota
        fetchData()
    }, [])

    async function fetchData(newState = state){
        try{
            const response = await api.get('clientes')
            console.log({response : response.data})
            // Armazenar o response em uma variável de estado
            setState({...newState, clientes: response.data})
        }
        catch(error){
            // alert("Erro " + error.message)
            setState({
              ...newState,
              notifSeverity: 'error',
              notifMessage: 'ERRO: ' + error.message
            })
        }
    }

    async function handleDialogClose(answer){
      let newState = {...state, dialogOpen: false}
      if(answer){
        try{
          await api.delete(`clientes/${deleteId}`)
          newState = {
            ...state,
            notifSeverity: 'success',
            notifMessage: 'Cliente excluido com sucesso.',
            dialogOpen: false
          }
          //Recarregar os dado da grid
          fetchData(newState)
          // window.alert("Item excluido com sucesso!")
        }
        catch(error){
          // window.alert("ERRO: Não foi possível excluir o item!\nMotivo: " + error.message)
          setState({
            ...newState,
            notifSeverity: 'error',
            notifMessage: "ERRO: Não foi possível excluir o Cliente!\nMotivo: " + error.message
          })
        }
      }
      else{
        setState(newState)
      }
    }

    function handleNotifClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }

    setState({...state, notifMessage: ''}); // Fecha a notificação
  };

    // Retorno da função com os elementos HTML que serão incluídos na página
    return (
        <>
            <h1>Listagem de Clientes</h1>
            <ConfirmDialog
              title="Confirmação necessária"
              open={dialogOpen}
              onClose={handleDialogClose}
            >
              Deseja realmente excluir este item?
            </ConfirmDialog>

            <Notification
              severity={notifSeverity}
              message={notifMessage}
              open={notifMessage}
              duration={4000}
              onClose={handleNotifClose}
            />

            <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              sx={{
                // Esconde os botões de editar e Excluir na visualização normal
                '& .MuiDataGrid-row button':{
                  visibility: 'hidden'
                },
                // Esconde os botões de editar e Excluir na visualização normal
                '& .MuiDataGrid-row:hover button':{
                  visibility: 'visible'
                }
              }}
              rows={clientes}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              autoHeight
              disableSelectionOnClick
            />
            </Box>
        </>
    )
}