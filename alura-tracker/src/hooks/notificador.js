import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { store } from "@/store";
export default () => {
    const notificar = (tipo, titulo, texto) => {
        store.commit(NOTIFICAR, { titulo, texto, tipo });
    };
    return {
        notificar
    };
};
//# sourceMappingURL=notificador.js.map