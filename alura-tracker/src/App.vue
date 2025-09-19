<template>
    <main 
        class="columns is-gapless is-multiline"
        :class="{'modo-escuro': modoEscuroAtivado}"
    >
        <div class="column is-one-quarter">
            <BarraLateral @ao-tema-alterado="alterarTema"/>
        </div>
        <div class="column is-three-quarter conteudo">
            <Formulario @ao-salvar-tarefa="salvarTarefa"/>
            <div class="lista">
                <Tarefa 
                    v-for="(tarefa, index) in tarefas" 
                    :key="index"
                    :tarefa="tarefa"
                />
                <Box v-if="!existemTarefa">
                    Nenhuma tarefa adicionada.
                </Box>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
        tarefas: [] as ITarefa[],
        modoEscuroAtivado: false
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
        this.tarefas.push(tarefa)
    },
    alterarTema(modoEscuroAtivado: boolean): void {
        this.modoEscuroAtivado = modoEscuroAtivado
    }
  },
  computed: {
    existemTarefa(): boolean {
        return !(this.tarefas.length === 0)
    }
  },
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  }
});
</script>

<style scoped>
.lista {
    padding: 1.25rem;
}

main {
    --bg-primario: #FFF;
    --texto-primario: #000;
}

main.modo-escuro {
    --bg-primario: #2B2B42;
    --texto-primario: #FFF;
}

.conteudo {
    background-color: var(--bg-primario);
}
</style>
