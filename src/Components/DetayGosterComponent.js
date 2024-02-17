import EtkinlikService from '../services/EtkinlikService';
import React, { Component } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import validator from 'validator'

import { Editor } from 'react-draft-wysiwyg';

class DetayGosterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            baslik: '',
            icerik: '',
            durum: '',
            tarih: '',
            detay: '',
            previosDetay:'',
            editorState: EditorState.createEmpty(),
            validDate:''


        }
        this.changeBaslikHandler = this.changeBaslikHandler.bind(this);
        this.changeIcerikHandler = this.changeIcerikHandler.bind(this);
        this.changeDurumHandler = this.changeDurumHandler.bind(this);
        this.changeTarihHandler = this.changeTarihHandler.bind(this);
        this.changeDetayHandler = this.changeDetayHandler.bind(this);
        this.updateEtkinlik = this.updateEtkinlik.bind(this);


    }
    checkIfnull=()=>{
        if(this.state.baslik===''){
            alert('baslik bos oalamaz!')
            return  false
        }
        if(this.state.icerik===''){
            alert('icerik  bos oalamaz!')
            return  false
        }
        if(this.state.durum===''){
            alert('durum bos oalamaz!')
            return  false
        }
        if(this.state.tarih===''){
            alert('tarih bos oalamaz!')
            return  false
        }
        if(this.state.detay===''){
            alert('detay bos oalamaz!')
            return  false
        } 
       return true
    }
   
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });

         this.setState({ detay: editorState.getCurrentContent().getPlainText()})
    };
    
    changeBaslikHandler = (event) => {
        this.setState({ baslik: event.target.value })

    }
    changeIcerikHandler = (event) => {
        this.setState({ icerik: event.target.value })

    }
    changeDurumHandler = (event) => {
        this.setState({ durum: event.target.value })

    }
    changeTarihHandler = (event) => {
        if (validator.isDate(event.target.value)) { 
            console.log('date is valid');
            this.state.validDate=true;
            this.state.tarih=event;
          //setErrorMessage('Valid Date :)') 
        } else { 
            console.log('date is invalid');
            this.state.validDate=false;
          //setErrorMessage('Enter Valid Date!') 
        } 
        this.setState({ tarih: event.target.value })

    }
    changeDetayHandler = (event) => {
        this.setState({ detay: event.target.value })

    }
    updateEtkinlik = (e) => {
        e.preventDefault();
        if(this.checkIfnull()==false){
            return
        }
        if(this.state.validDate===false)
        {
            alert("Tarih Formati bu sekildedir : yyyy-MM-dd");
            return;
        }
        let content = String(this.state.durum).toLocaleLowerCase();
        let durum_t=0;
     
        if(content=="aktif" ){
            durum_t= 1
        }else if(content=="passif"){
            durum_t= 0
        }else{

            alert('durum aktif/passif olarak girilmeli !')
            return
        }
        console.log("durum:", durum_t);
        let etkinlik = { baslik: this.state.baslik, icerik: this.state.icerik, durum: durum_t, tarih: this.state.tarih, detay:  this.state.detay };
        console.log('etkinlik => ' + JSON.stringify(etkinlik))
        EtkinlikService.updateEtkinlik(this.state.id, etkinlik).then(res => {
            this.props.history.push('/etkinlikler');

        });
    }
    cancel() {

        this.props.history.push('/etkinlikler')

    }
    componentDidMount() {

        EtkinlikService.getById(this.state.id).then((res) => {
            let etkinlik = res.data;
            if(etkinlik.durum==1){
                this.setState({durum: "aktif"})
            }else{
                this.setState({durum: "passif"})
            }
            this.setState({
                baslik: etkinlik.baslik,
                icerik: etkinlik.icerik,
                tarih: etkinlik.tarih,
                detay: etkinlik.detay,
                previosDetay:etkinlik.detay
                    


            });

        });
        
    }



    render() {
        const { editorState } = this.state;
        let previosDtay=this.state.detay;
      

        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        //  <Editor editorState={this.state.editorState} />
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-8 offset-md-2 offset-md-2">
                        <h3 className="text-center"> Etkinlik Guncelle</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Baslik</label>
                                    <input placeholder="Baslik" name="baslik" className="form-control"
                                        value={this.state.baslik} onChange={this.changeBaslikHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Icerik</label>
                                    <input placeholder="Icerik" name="icerik" className="form-control"
                                        value={this.state.icerik} onChange={this.changeIcerikHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Durum</label>
                                    <input placeholder="Durum" name="durum" className="form-control"
                                        value={this.state.durum} onChange={this.changeDurumHandler} />
                                </div>
                                <div className="form-group">
                                <label>Tarih</label>
                               
                                <input placeholder="yyyy/mm/dd" name="tarih" className="form-control" 
                              value={this.state.tarih} onChange={this.changeTarihHandler} />
                               
                                        
                                </div>
                                <div className="form-group">
                            
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    

                                    />
                                
                                    <textarea value= {this.state.previosDetay + this.state.detay} disabled  >
                                      

                                    </textarea>
                                

                             
                                </div>

                                <button className="btn btn-success" onClick={this.updateEtkinlik.bind(this)} > Degisikleri kaydet  </button>
                                <button className="btn btn-info" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}> Geri Don </button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DetayGosterComponent;