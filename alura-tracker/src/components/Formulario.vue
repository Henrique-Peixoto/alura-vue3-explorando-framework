<template>
    <div class="box">
        <div class="columns">
            <div 
                class="column is-8"
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
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from '@/components/Temporizador.vue';

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
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: string): void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            
            this.descricao = ''
        } 
    }
})
</script>