<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button 
            class="button"
            @click="alterarTema"
        >
            {{ textoBotao }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: [
        'aoTemaAlterado'
    ],
    data() {
        return {
            modoEscuroAtivado: false
        }
    },
    computed: {
        textoBotao() {
            if (this.modoEscuroAtivado) {
                return 'Desativar modo escuro'
            }

            return 'Ativar modo escuro'
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivado = !this.modoEscuroAtivado
            this.$emit('aoTemaAlterado', this.modoEscuroAtivado)
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background-color: #0d3b66;
    width: 100%;
    height: 100vh;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>
