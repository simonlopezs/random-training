# Random Training

Aplicación web para generar entrenamientos aleatorios de calistenia. El usuario selecciona ejercicios, configura un rango de repeticiones, y la app genera una "baraja" de cartas aleatorias con ejercicios y repeticiones que se van sacando una a una hasta completar el entrenamiento.

## Tecnologías

- **Frontend:** Vue 3 + TypeScript (Vite)
- **UI:** shadcn/ui para Vue + Tailwind CSS v4
- **State:** Pinia
- **Routing:** Vue Router
- **Imágenes:** [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (dominio público)
- **Linting:** ESLint + Prettier
- **Deploy:** surge.sh → https://random-training.surge.sh

## Flujo de la app

1. **Landing** → Botón "Comenzar"
2. **Selección de ejercicios** → Grid de ejercicios de calistenia con toggle
3. **Configuración de repeticiones** → Min/max reps con controles +/−
4. **Entrenamiento** → Cartas aleatorias (ejercicio + reps), cronómetro en vivo, barra de progreso
5. **Finalización** → Tiempo total y series completadas
