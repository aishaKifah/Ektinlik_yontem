import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";

import draftToHtml from "draftjs-to-html";
import EtkinlikService from '../services/EtkinlikService';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import validator from 'validator'
  

let editorState = ''




export default class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            baslik: '',
            icerik: '',
            durum: '',
            tarih: '',
            detay: '',
            validDate:''
        };
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
        } else { 
           console.log('date is invalid');
            this.state.validDate=false;
        } 
        this.setState({ tarih: event.target.value })

    }
    changeDetayHandler = (event) => {
        this.setState({ detay: event.target.value })

    }
    saveEtkinlik = (e) => {
       
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
        if (content == "aktif") {
            this.state.durum=1
                } else if (content == "pasif") {
                    this.state.durum=0

        }else{

            alert('durum aktif/passif olarak girilmeli !')
            return
        }
        console.log("durum:", this.state.durum);
        console.log("tarih:", this.state.tarih);
        
        let etkinlik = { baslik: this.state.baslik, icerik: this.state.icerik, durum: this.state.durum, tarih: this.state.tarih, detay: this.state.detay };
        console.log('etkinlik => '+ JSON.stringify(etkinlik))
        EtkinlikService.creatEtkinlik(etkinlik).then(res => {
            

            if(res.data=="invalid date"){
                alert('dogru degil');
            }else if (res.data=="added"){
                alert('Basarili ekleme');
            this.props.history.push('/etkinlikler')}
         

        });
    }
    cancel() {

        this.props.history.push('/etkinlikler')

    }

   

    render() {
        const validateDate = (value) => { 
    
            if (validator.isDate(value)) { 
                console.log('date is valid');
                this.state.validDate=true;
                this.state.tarih=value;
              //setErrorMessage('Valid Date :)') 
            } else { 
                console.log('date is invalid');
                this.state.validDate=false;
              //setErrorMessage('Enter Valid Date!') 
            } 
          } 

        const { editorState } = this.state;
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        return (
            <div>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center"> Etkinlik Ekle</h3>
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
                                <input placeholder="aktif/pasif" name="durum" className="form-control"

                                    value={this.state.durum} onChange={this.changeDurumHandler} />
                            </div>
                                <div className="form-group">
                                <label>Tarih</label>
                               
                                <input placeholder="yyyy/mm/dd" name="tarih" className="form-control" 
                              value={this.state.tarih} onChange={this.changeTarihHandler} />
                               
                            </div>
                            <div className="form-group">
                                <label>Detay</label>
                                {/* <input placeholder="" name="detay" className="form-control"
                                    value={this.state.detay} onChange={this.changeDetayHandler} /> */}


                            <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                            />
                            </div>
                           

                        </form>
                        <button className="btn btn-success" onClick={this.saveEtkinlik} > Ekle </button>
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}> Iptal et </button>
                    </div>


                </div>
            </div>

        );
    }
}