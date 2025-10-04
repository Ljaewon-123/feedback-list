<script setup lang="ts">
import {
  configureLinkTooltip,
  linkTooltipPlugin,
  linkTooltipConfig,
  linkTooltipState,
  linkTooltipAPI,
} from '@milkdown/components/link-tooltip'
import {
  listItemBlockComponent,
  listItemBlockConfig,
} from '@milkdown/components/list-item-block'
import { tableBlock, tableBlockConfig } from '@milkdown/components/table-block'
import {
  codeBlockComponent,
  codeBlockConfig,
} from '@milkdown/components/code-block'
import { languages } from '@codemirror/language-data';
import { Milkdown, useEditor, useInstance } from '@milkdown/vue';
import { defaultValueCtx, Editor, editorViewCtx, rootCtx } from '@milkdown/kit/core';
import { nord } from '@milkdown/theme-nord'
import { commonmark, linkSchema } from '@milkdown/kit/preset/commonmark'
import { imageBlockComponent } from '@milkdown/kit/component/image-block'
import { gfm } from '@milkdown/kit/preset/gfm'
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { getMarkdown } from '@milkdown/utils';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';

const markdown = defineModel('md', { default: `# Write your **markdown** here!`})

const toast = useToast();

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, markdown.value)

      ctx.get(listenerCtx).markdownUpdated((ctx, md, prevMarkdown) => {
        markdown.value = md 
      })
    })
    .config(ctx => {
      ctx.update(codeBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        copyIcon: '',
        copyText: 'Copy',
        languages,
        expandIcon: '',
        extensions: [basicSetup, oneDark, keymap.of(defaultKeymap)],
        previewToggleButton: (previewOnlyMode) =>
          previewOnlyMode ? 'Show code' : 'Hide code',
        onCopy: (text) => {
          toast.add({ severity: 'success', summary: 'Copied!', detail: 'Copied Success', life: 3000 });
        },
      }))
    })
    .use(commonmark)
    .use(imageBlockComponent)
    .use(gfm)
    .use(listItemBlockComponent)
    .use(tableBlock)
    .use(codeBlockComponent)
    .use(listener)
})


</script>

<template>
  <Milkdown class="milkdown" />
</template>

<style>
.milkdown .tools{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px 4px 16px;
  background-color: #282c34;
  color: var(--background);
}
.milkdown .copy-button {
  display: none; /* 기본적으로 숨김 */
  width: 50px;
  padding: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 100px;
  border: 1px solid white;
}

.milkdown .milkdown-code-block:hover .copy-button {
  display: inline-block; /* 또는 flex, block 등 상황에 맞게 */
}
</style>