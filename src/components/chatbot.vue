<template>
    <div id="app">
        <v-content>
            <v-container
                    fluid
                    fill-height
            >
                <v-layout
                        align-center
                        justify-center
                >
                    <v-flex
                            xs12
                            sm8
                            md4
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>{{json.appName}}</v-toolbar-title>
                            </v-toolbar>

                            <p v-if="actualScope === 'whatCanIDo'">{{json.welcomeMessage}}</p>

                            <div v-if="json.scopes[actualScopeIndex].type === 'selectAnswer'">
                                <v-card-actions v-for="(item, index) in json.scopes[actualScopeIndex].answers" v-bind:key="index">
                                    <v-btn :ripple="false" class="answer" color="primary" @click="getNextScope(json.scopes[actualScopeIndex].answers[index][1], json.scopes[actualScopeIndex].answers[index][0])">{{json.scopes[actualScopeIndex].answers[index][0]}}</v-btn>
                                </v-card-actions>
                                <v-card-actions v-if="actualScope !== 'whatCanIDo'">
                                    <v-btn :ripple="false" class="answer backBtn" color="#EF2F3E" dark @click="goBack('Retour')">Retour</v-btn>
                                </v-card-actions>
                                <v-card-actions v-if="actualScope !== 'whatCanIDo'">
                                    <v-btn :ripple="false" class="answer backMenuBtn" color="#EF2F3E" dark @click="getNextScope('whatCanIDo', 'Menu')">Menu</v-btn>
                                </v-card-actions>
                            </div>

                            <div v-else-if="end !== 1">
                                <p>{{json.scopes[actualScopeIndex].text}}</p>
                                <p>{{json.scopes[allGoodScopeIndex].text}}</p>
                                <v-card-actions v-for="(item, index) in json.scopes[allGoodScopeIndex].answers" v-bind:key="index">
                                    <v-btn :ripple="false" class="answer" color="primary" @click="getNextScope(json.scopes[allGoodScopeIndex].answers[index][1], json.scopes[allGoodScopeIndex].answers[index][0])">{{json.scopes[allGoodScopeIndex].answers[index][0]}}</v-btn>
                                </v-card-actions>
                            </div>

                            <div v-else>
                                <p>{{json.scopes[endScopeIndex].text}}</p>
                            </div>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import jsonFile from '../../DialogTree ChatBot Pandacola.json'
    import axios from 'axios'

    export default {
        name: "chatbot",
        data: () => ({
            json: jsonFile,
            history: [],
            actualScope: "whatCanIDo",
            previousScope: [],

            allGoodScope: "allGood",
            allGoodScopeIndex: 0,

            endScope: "end",
            endScopeIndex: 0,

            end: 0,
        }),
        mounted() {
            console.log(this.history);
            let index = 0;
            for (let elem in this.json.scopes) {
                if (this.allGoodScope === this.json.scopes[elem].name) {
                    this.allGoodScopeIndex = index;
                    break;
                }
                index++
            }

            index = 0;
            for (let elem in this.json.scopes) {
                if (this.endScope === this.json.scopes[elem].name) {
                    this.endScopeIndex = index;
                    break;
                }
                index++
            }

        },
        methods: {
            getNextScope(nextScope, btnTxt) {
                this.history.push(btnTxt);
                if (nextScope === this.endScope) {
                    this.end = 1;
                    this.saveToDb();
                }
                this.previousScope.push(this.actualScope);
                this.actualScope = nextScope;
                console.log("history: ", this.history);
            },
            goBack(btnTxt) {
                this.history.push(btnTxt);
                this.actualScope = this.previousScope[this.previousScope.length-1];
                this.previousScope.pop();
            },
            saveToDb() {
                let serialisedHistory = '';

                for (let item in this.history) {
                    serialisedHistory += this.history[item];
                    serialisedHistory += '//';
                }
                axios.post(`http://localhost:3000/saveHistory`, {
                    history: serialisedHistory,
                }).then(function (response) {
                    console.log("réponse du serveur: " + response);
                }).catch(function (error) {
                    console.log("erreur: ", error.data);
                });
            }
        },
        computed: {
            actualScopeIndex: function() {
                let index = 0;
                for (let elem in this.json.scopes) {
                    if (this.actualScope === this.json.scopes[elem].name) {
                        break;
                    }
                    index++
                }
                return index;
            },
        }
    }
</script>

<style scoped>

    p {
        font-size: 1vw;
        margin: 10px;
        margin-bottom: 30px;
    }

    .answer {
        width: 100%;
    }

    .backBtn {
        margin-top: 40px;
    }

</style>