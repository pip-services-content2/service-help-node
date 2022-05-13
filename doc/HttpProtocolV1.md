# HTTP REST Protocol (version 1) <br/> Help Microservice

Help microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [HelpPageV1 class](#class1)
* [HelpV1 class](#class2)
* [POST /help/get_help](#operation1)
* [POST /help/get_random_help](#operation2)
* [POST /help/get_help_by_id](#operation3)
* [POST /help/create_help](#operation4)
* [POST /help/update_help](#operation5)
* [POST /help/delete_help_by_id](#operation6)

## Data types

### <a name="class1"></a> HelpPageV1 class

Contains single page from a help

**Properties:**
- title: MultiString - page title in multiple lanuguages
- content: MultiString - page content in multiple languages
- more_url: string - Url with additional information
- color: string - page background color code or name
- pic_id: string - picture block id from blobs to show at the page

### <a name="class4"></a> HelpV1 class

Represents a system help. 

**Properties:**
- id: string - unique help id
- type: string - help type, i.e. 'introduction', 'new release', etc.
- app: string - (optional) application name
- version: string - (optional) application version
- create_time: Date - date and time when help was created
- pages: [HelpPageV1] - (optional) array of pages
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## Operations

### <a name="operation1"></a> Method: 'POST', route '/help/get_help'

Retrieves a list of help by specified criteria

**Request body:** 
- filter: object - filter parameters
  - type: string - (optional) help type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<HelpV1> or error

### <a name="operation2"></a> Method: 'POST', route '/help/get\_random\_help'

Retrieves a random help from filtered resultset

**Request body:** 
- filter: object - filter parameters
  - type: string - (optional) help type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags

**Response body:**
Random HelpV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/help/get\_help\_by\_id'

Retrieves a single help specified by its unique id

**Request body:** 
- help_id: string - unique help id

**Response body:**
HelpV1 object, null if object wasn't found or error 

### <a name="operation4"></a> Method: 'POST', route '/help/create_help'

Creates a new system help

**Request body:**
- help: HelpV1 - Help to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created HelpV1 object or error

### <a name="operation5"></a> Method: 'POST', route '/help/update_help'

Updates system help

**Request body:**
- help: HelpV1 - Help to be updated

**Response body:**
Updated HelpV1 object or error 
 
### <a name="operation6"></a> Method: 'POST', route '/help/delete\_help\_by\_id'

Deletes system help specified by its unique id

**Request body:** 
- help_id: string - unique help id

**Response body:**
Deleted HelpV1 object or error 
 
