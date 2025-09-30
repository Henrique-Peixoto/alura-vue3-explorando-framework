<template>
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
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '@/components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from '@/components/Box.vue';
import { key } from '@/store';
import { useStore } from 'vuex';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';

export default defineComponent({
  name: 'App',
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
        this.store.commit(ADICIONA_TAREFA, tarefa)
    }
  },
  computed: {
    existemTarefa(): boolean {
        return !(this.tarefas.length === 0)
    }
  },
  components: {
    Formulario,
    Tarefa,
    Box
  },
  setup() {
    const store = useStore(key)

    return {
        tarefas: computed(() => store.state.tarefas),
        store
    }
  }
});
</script>

<style scoped>
.lista {
    padding: 1.25rem;
}
</style>
