# json-viewer

## 示例
```html
<jv
  :value="jsonData"
  :expand-depth=5
  copyable
  boxed
  sort>
  </jv>
```

``` js

import jv from 'jsonViewer'
components: {
    jv
  },

```

## 选项

| 属性               | 描述                                                                                                                       | 默认值                        |
| ------------------ | :------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `value`            | json对象的值，可以使用v-model，支持响应式                                                                                  | **必填**                      |
| `expand-depth`     | 默认展开的层级                                                                                                             | `1`                           |
| `copyable`         | 展示复制按钮，默认文案为：copy、copied!, 你可以设置一个对象`{copyText: 'copy', copiedText: 'copied'}` 来自定义复制按钮文案 | `false`                       |
| `sort`             | 按照key排序展示                                                                                                            | `false`                       |
| `boxed`            | 为组件添加一个盒样式                                                                                                       | `false`                       |
| `theme`            | 添加一个自定义的样式class用作主题                                                                                          | `jv-light`                    |
| `expanded`         | 默认展开视图                                                                                                               | `false`                       |
| `timeformat`       | 自定义时间格式函数                                                                                                         | time => time.toLocaleString() |
| `preview-mode`     | 不可折叠模式，默认全部展开                                                                                                 | `false`                       |
| `show-array-index` | 是否显示数组索引                                                                                                           | `true`                        |


## 事件

| 事件     | 描述             | 值  |
| -------- | :--------------- | --- |
| `copied` | 复制文本后的事件 |     |

## Slots

| 名称   | 描述           | Scope               |
| ------ | :------------- | ------------------- |
| `copy` | 自定义拷贝按钮 | `{copied: boolean}` |

## 快捷键
| 名称          | 描述                     |
| ------------- | :----------------------- |
| `alt` + click | 展开当前节点下的所有节点 |

## 主题

自定义主题:
复制粘贴下面的模板并且根据自定义的theme名称做对应调整:

``` scss
.json-theme {
  background: #fff;
  white-space: nowrap;
  color: #525252;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #111111 }
  .jv-item {
    &.jv-array { color: #111111 }
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-number-float { color: #fc1e70 }
    &.jv-number-integer { color: #fc1e70 }
    &.jv-object { color: #111111 }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}
```
