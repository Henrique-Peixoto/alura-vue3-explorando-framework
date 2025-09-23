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
import { defineComponent } from 'vue';
import Formulario from '@/components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from '@/components/Box.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
        tarefas: [] as ITarefa[]
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
        this.tarefas.push(tarefa)
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
  }
});
</script>

<style scoped>
.lista {
    padding: 1.25rem;
}
</style>
