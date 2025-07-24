"use client";

import { VStack } from "@chakra-ui/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

import type { BasePdfFile } from "@/types/pdf";

import { DraggableFileItem } from "./DraggableFileItem";

type DraggableFileListProps<T extends BasePdfFile> = {
  files: T[];
  onReorder: (files: T[]) => void;
  onRemove: (id: string) => void;
  /**
   * Optional custom renderer for each item.  Receives the file and a flag
   * indicating drag state.  If omitted, DraggableFileItem is used.
   */
  renderItem?: (
    file: T,
    isDragging: boolean,
    dragHandleProps: React.HTMLAttributes<HTMLDivElement>
  ) => React.ReactNode;
};

/**
 * A general-purpose sortable list for PDF files.
 * Combines the logic used in both Merge & Compress features.
 */
export const DraggableFileList = <T extends BasePdfFile>({
  files,
  onReorder,
  onRemove,
  renderItem,
}: DraggableFileListProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      onReorder(arrayMove(files, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={files.map((f) => f.id)} strategy={verticalListSortingStrategy}>
        <VStack gap={3} align="stretch">
          {files.map((file) => (
            <SortableItem key={file.id} file={file} onRemove={onRemove} customRender={renderItem} />
          ))}
        </VStack>
      </SortableContext>
    </DndContext>
  );
};

/* ------------------------------------------------------------------ */
/*                       Internal helper component                     */
/* ------------------------------------------------------------------ */

type SortableItemProps<T extends BasePdfFile> = {
  file: T;
  onRemove: (id: string) => void;
  customRender?: (
    file: T,
    isDragging: boolean,
    dragHandleProps: React.HTMLAttributes<HTMLDivElement>
  ) => React.ReactNode;
};

const SortableItem = <T extends BasePdfFile>({
  file,
  onRemove,
  customRender,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {customRender ? (
        customRender(file, isDragging, { ...attributes, ...listeners })
      ) : (
        <DraggableFileItem
          file={file}
          onRemove={onRemove}
          isDragging={isDragging}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
      )}
    </div>
  );
};
