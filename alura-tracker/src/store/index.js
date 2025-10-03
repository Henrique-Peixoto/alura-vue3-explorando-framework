import { createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, ADICIONA_TAREFA, REMOVE_TAREFA, ATUALIZA_TAREFA, NOTIFICAR, DEFINIR_PROJETOS, DEFINIR_TAREFAS } from "./tipo-mutacoes";
import { CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import clienteHttp from "@/http";
export const key = Symbol();
export const store = createStore({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            };
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos) {
            state.projetos = projetos;
        },
        [DEFINIR_TAREFAS](state, tarefas) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa) {
            state.tarefas.push(tarefa);
        },
        [ATUALIZA_TAREFA](state, tarefa) {
            const index = state.tarefas.findIndex(t => t.id === tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [REMOVE_TAREFA](state, id) {
            state.tarefas = state.tarefas.filter(t => t.id !== id);
        },
        [NOTIFICAR](state, novaNotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id !== novaNotificacao.id);
            }, 3000);
        }
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            clienteHttp
                .get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data));
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto) {
            return clienteHttp.post('/projetos', {
                nome: nomeDoProjeto
            });
        },
        [ALTERA_PROJETO](contexto, projeto) {
            return clienteHttp.put(`/projetos/${projeto.id}`, projeto);
        },
        [REMOVER_PROJETO]({ commit }, id) {
            return clienteHttp
                .delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id));
        },
        [OBTER_TAREFAS]({ commit }) {
            clienteHttp
                .get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa) {
            return clienteHttp
                .post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data));
        }
    }
});
export function useStore() {
    return vuexUseStore(key);
}
// Notas:
// Mutations são sempre síncronas.
// Mutations mudam os estado.
// Actions podem ser tanto sícronas quanto assícronas.
// Actions devem chamar (commit) mutations para alteração de estado (boa prática)
//# sourceMappingURL=index.js.map