sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("testefiorierick.controller.Main", {
            onInit: function () {
                var ImageList={
                    Images:[
                        {
                            title:"Google",
                            url:"https://www.google.com"
                        }
                    ]
                };

                var ImageModel = new JSONModel(ImageList);
                this.getView().setModel(ImageModel, "ModeloImagem");

            },
            onPressBuscar: function(){
                //alert("Começou a revolução do SAP Fiori");

                var oInputBusca=this.byId("inpBusca");
                var sQuery=oInputBusca.getValue();
                
                //este comando exibe um alerta na tela
                //alert(sQuery);
                
                $.ajax({
                    //cabecalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    jsonpCallback: "getJSON",
                    contentType: "application/json",
                    headers: {
                        "X-RapidAPI-Key": "5c4d9e456fmshe4211ae87fc3c15p127f28jsn79645859d820",
		                "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    },

                    //corpo
                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": true
                    },

                    //retorno em caso de sucesso
                    success: function(data, textStatus){
                        var oImageModel=this.getView().getModel("ModeloImagem");
                        var oDadosImage=oImageModel.getData();

                        //limpando o conteudo da variavel que armazena as imagens obtidas da busca anterior
                        oDadosImage={
                            Images:[]
                        };

                        //registrando na variavel uma lista de restornos da busca
                        oImageModel.setData(oDadosImage);
                        debugger

                        var ListaResultados=data.value;
                        var newItem;

                        for(var i=0; i<ListaResultados.length ; i++){
                            newItem=ListaResultados[i];
                            oDadosImage.Images.push(newItem);
                        };

                        oImageModel.refresh();


                    }.bind(this),

                    //retorno em caso de erro
                    error: function(){

                    }.bind(this)

                }); //fim do ajax
            }
        });
    });
