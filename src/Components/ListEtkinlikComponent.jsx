import React, { Component } from 'react';
import EtkinlikService from '../services/EtkinlikService';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';



class ListEtkinlikComponent extends Component {
    constructor(props){
      super(props)
       this.state={
           etkinlikler:[]
       }
       this.etkinlikEkle= this.etkinlikEkle.bind(this);
       this.detayGoster= this.detayGoster.bind(this);

    }
    componentDidMount(){
        EtkinlikService.getEtkinlikler().then((res) => {
           
            this.setState({etkinlikler: res.data})
           
        });
    
    }
    etkinlikEkle(){
        this.props.history.push("/ektinlik-ekle")

    }

    detayGoster(id)
    {
      this.props.history.push(`/ektinlik-detay/${id}`);
       

    }

    deleteEtkinlik(id)
    {
      // alert(JSON.stringify(value));
       if(window.confirm(id+"'li olan etkinligi silmek istediginizden emin misiniz?",'evet','hayir'))
      EtkinlikService.deleteEtkinlik(id).then((res) => {
        EtkinlikService.getEtkinlikler().then((res) => {
           
            this.setState({etkinlikler: res.data})
           
        });        
       // this.setState({etkinlikler: res.data})
       
    });
    }


    render() {
        return (
            <div>
              <MuiThemeProvider>
                  <div>
                  <AppBar
              title="Etkinlik Yontem Sistemi"
            />
                   <div className="card-body">
                            <form>
                <h2 className="text-center" > Etkinlikler List </h2>
                <div  className="row" > <button style={{marginLeft: "10px"}} className="btn btn-primary" onClick={this.etkinlikEkle.bind(this)} > Etkinlik Ekle </button> 
                 <button style={{marginLeft: "10px"}} className="btn btn-primary" > Takvim Goster </button> </div>
                <div className = "row">
                    <table style={{marginLeft: "12px"}} className="table table-striped table-bodered">
                        <thead>
                            <tr> 
                                <th>Etkinlik ID </th>
                                <th>Etkinlik baslik </th>
                                <th>Etkinlik icerik </th>
                                <th>Etkinlik durum </th>
                                <th>Etkinlik tarih </th>
                                <th>Etkinlik detay </th>
                                <th>Action </th>

                            </tr>
                        </thead>
                        <tbody>    
                               {
                                   this.state.etkinlikler.map(
                                       etkinlikler=>
                                       <tr key={etkinlikler.id} >
                                        <td> {etkinlikler.id}</td>
                                        <td> {etkinlikler.baslik}</td>
                                        <td> {etkinlikler.icerik}</td>
                                         <td> {etkinlikler.durum  ? "aktif" : "pasif"}</td>
                                          <td> {etkinlikler.tarih} </td>
                                          <td> {etkinlikler.detay}</td>
                                          <td >
                                          <button onClick={()=>this.detayGoster(etkinlikler.id)} className="btn btn-info"> Detay</button>
                                          <button style={{marginLeft: "10px"}}  onClick={()=>this.deleteEtkinlik(etkinlikler.id)} className="btn btn-danger">Sil </button>
                                          </td>
                    
                                        </tr>


                                 )

                                    
                               }
        
                        </tbody>
                   </table>
                   
            </div>
            </form>
                   </div>
                   <FooterComponent/>
                   </div>
                   </MuiThemeProvider>

            </div>
        );
    }

}

export default ListEtkinlikComponent;