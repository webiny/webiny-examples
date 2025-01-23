# Field Encryption

This extension serves as an example of how to introduce encryption on a content model field level.

The most important part of this extension is the use of `StorageTransformPlugin`, found in `extensions/fieldEncryption/src/index.ts`:

```ts
new StorageTransformPlugin({
    fieldType: "text",
    fromStorage: async ({ model, field, value }) => {
        if (usesEncryption(model, field)) {
            return decrypt(value);
        }

        return value;
    },
    toStorage: async ({ model, field, value }) => {
        if (usesEncryption(model, field)) {
            return encrypt(value);
        }

        return value;
    }
})
```

As we can see, in the plugin, via the `usesEncryption` function, we're first ensuring that we only apply encryption to a specific model and field ID. In this case, we're only doing it for the `productSku` field of the `product` content model entries. 

When it comes to actual encryption/decryption, this is something that needs to be still implemented (this example just provides an overview how to do it).