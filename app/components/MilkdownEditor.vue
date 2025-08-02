<script setup lang="ts">
import {
  configureLinkTooltip,
  linkTooltipPlugin,
  linkTooltipConfig,
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
import { Milkdown, useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { nord } from '@milkdown/theme-nord'
import { commonmark, linkSchema } from '@milkdown/kit/preset/commonmark'
import { imageBlockComponent } from '@milkdown/kit/component/image-block'
import { gfm } from '@milkdown/kit/preset/gfm'
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

const markdown =
`# Milkdown Nuxt Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Nuxt**.

code block

\`\`\`ts
import { Editor } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';

import { nord } from '@milkdown/theme-nord';
import '@milkdown/theme-nord/style.css';

Editor
  .make()
  .config(nord)
  .use(commonmark)
  .create();
\`\`\`

이건 리스트 

- [ ] Todo list item 1
    - [ ] Todo List item 1.1
    - [ ] Todo List item 1.2
- [ ] Todo list item 2
  1. List item 1
     1. List item 1.1
     2. List item 1.2
  2. List item 2
  3. List item 3
- [ ] Todo list item 3
  - List item 1
    - List item 1.1
    - List item 1.2
- List item 2
- List item 3

image?
![]()


table

| Fruit | Animal | Vegetable |
| ----- | :----: | --------: |
| Apple | Cat    | Carrot    |
| Banana| Dog    | Cabbage   |
| Cherry| Horse  | Celery    |

`

const toast = useToast();

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, markdown),
      configureLinkTooltip(ctx)
    })
    .config(ctx => {
      ctx.update(codeBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        copyIcon: '📄',
        copyText: 'Copy code',
        languages,
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
    .use(linkTooltipPlugin)
    .use(gfm)
    .use(listItemBlockComponent)
    .use(tableBlock)
    .use(codeBlockComponent)
})
</script>

<template>
  <Milkdown />
</template>
