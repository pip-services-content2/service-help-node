# Help Microservice

This is a context help microservice from Pip.Services library. 
It provides context help to application users broken by topics and articles.
Each help:
- Can be written in multiple languages
- Can include one or more blocks of content with title, text and a picture
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, AWS Lambda
* External APIs: HTTP/REST, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [service-attachments](https://github.com/pip-services-content2/service-attachments-node) - to reference pictures and documents associates with help

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Help](doc/Development.md)
* [Configuration Help](doc/Configuration.md)
* [Deployment Help](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-help-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)

##  Contract

TODO: Rewrite documentation!

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class HelpTypeV1 {
    public static readonly Introduction = "introduction";
    public static readonly NewRelease = "new release";
}

class HelpV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public type: string;
    public app?: string;
    public version?: string;

    /* Automatically managed fields */
    public create_time: Date;

    /* Content */
    public pages: HelpPageV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}

class HelpPageV1 {
    public title: MultiString;
    public content?: MultiString;
    public more_url?: string;
    public color?: string;
    public pic_id?: string;
    public pic_url?: string;
}

class HelpStatusV1 {
    public static readonly New = "new";
    public static readonly Writing = "writing";
    public static readonly Translating = "translating";
    public static readonly Verifying = "verifying";
    public static readonly Completed = "completed";
}

interface IHelpV1 {
    getHelp(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<HelpV1>>;

    getRandomHelp(correlationId: string, filter: FilterParams): Promise<HelpV1>;

    getHelpById(correlationId: string, helpId: string): Promise<HelpV1>;

    createHelp(correlationId: string, help: HelpV1): Promise<HelpV1>;

    updateHelp(correlationId: string, help: HelpV1): Promise<HelpV1>;

    deleteHelpById(correlationId: string, helpId: string): Promise<HelpV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-help-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-help:persistence:file:default:1.0"
  path: "./data/help.json"

- descriptor: "service-help:controller:default:default:1.0"

- descriptor: "service-attachments:client:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "service-help:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Help](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-help-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-help-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.HelpHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new help
let help = await client.createHelp(
    null,
    { 
        type: 'introduction',
        app: 'Test App 1',
        pages: [
            { 
                title: { en: 'Welcome to Test App 1' } 
            }
        ]
    }
);
```

```javascript
// Get a random intro help for app1
let help = await client.getRandomHelp(
    null,
    {
        type: 'introduction',
        app: 'app1'
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

