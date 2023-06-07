# Page Element With Child Elements

This example shows how to create a custom page element named **Content Gallery**, that can accept a subset of other custom page elements as its children: **Droppable Element 1** and **Droppable Element 2** elements.

![Content Gallery](./screenshot.png)

This example also goes a step further and shows how a custom page element can also include one or more existing page elements, once dropped onto the page canvas in the page editor. In this case, the **Content Gallery** element includes one heading and two paragraph elements. This can be useful when in need to enable actual users to edit the content of the page element - inline.

As the final step, this example also show how we can register the "Content Gallery Block" block, which enables users to drop the block directly from the list of blocks. This makes the whole process a bit easier, since users do not need to first add a block to the page, and then drop the **Content Gallery** page element into it.