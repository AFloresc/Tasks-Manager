import { DndContext } from "@dnd-kit/core";

export default function AppDndProvider({
    children,
    onMoveTask,
    onMoveTaskToBoard
    }) {
    return (
        <DndContext
        onDragEnd={(event) => {
            const { active, over } = event;
            if (!over) return;

            const taskId = active.id;
            const fromBoardId = active.data?.current?.boardId;

            // MOVE TO ANOTHER BOARD
            if (over.id.startsWith("board-")) {
            const toBoardId = over.id.replace("board-", "");
            if (fromBoardId !== toBoardId) {
                onMoveTaskToBoard(taskId, fromBoardId, toBoardId);
            }
            return;
            }

            // MOVE BETWEEN COLUMNS
            onMoveTask(taskId, over.id, fromBoardId);
        }}
        >
        {children}
        </DndContext>
    );
}