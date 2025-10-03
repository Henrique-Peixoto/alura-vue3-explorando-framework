<template>
    <div class="box formulario">
        <div class="columns">
            <div 
                class="column is-5"
                role="form"
                aria-label="Formulário para a criação de uma nova tarefa."
            >
                <input 
                    type="text" 
                    class="input"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                >
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">
                            Selecionar o projeto
                        </option>
                        <option 
                            v-for="projeto in projetos"
                            :key="projeto.id"
                            :value="projeto.id"
                        >
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Temporizador from '@/components/Temporizador.vue';
import { useStore } from '@/store';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    // eslint-disable-next-line
    name: 'Formulario',
    emits: [
        'aoSalvarTarefa'
    ],
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: string): void {
            const idProjeto = this.projetos.find(projeto => projeto.id === this.idProjeto)

            if (idProjeto == null) {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Erro ao finalizar tarefa',
                    texto: 'A tarefa precisa estar vinculada a um projeto',
                    tipo: TipoNotificacao.FALHA
                })

                return
            }

            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: idProjeto
            })
            
            this.descricao = ''
        } 
    },
    setup() {
        const store = useStore()

        return {
            projetos: computed(() => store.state.projeto.projetos),
            store
        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>