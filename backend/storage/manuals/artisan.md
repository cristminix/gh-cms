# Artisan

```
./artisan  listModelAPIRoutes backend/src/api/data-source/config.json
-------------User--------------------
GET /users?page=<PAGE_NUMBER>&limit=<MAX_ROW>&order_by=<FIELD>&order_dir=<FIELD>
GET /user/:id
POST /user/create
POST /user/update/:id?
POST /user/delete/:id?
-------------CmsSetting--------------------
GET /cms-settings?page=<PAGE_NUMBER>&limit=<MAX_ROW>&order_by=<FIELD>&order_dir=<FIELD>
GET /cms-setting/:id
POST /cms-setting/create
POST /cms-setting/update/:id?
POST /cms-setting/delete/:id?
-------------YtUploadData--------------------
GET /yt-upload-datas?page=<PAGE_NUMBER>&limit=<MAX_ROW>&order_by=<FIELD>&order_dir=<FIELD>
GET /yt-upload-data/:id
POST /yt-upload-data/create
POST /yt-upload-data/update/:id?
POST /yt-upload-data/delete/:id?
-------------YtUpload--------------------
GET /yt-uploads?page=<PAGE_NUMBER>&limit=<MAX_ROW>&order_by=<FIELD>&order_dir=<FIELD>
GET /yt-upload/:id
POST /yt-upload/create
POST /yt-upload/update/:id?
POST /yt-upload/delete/:id?
-------------YtUploadTT--------------------
GET /yt-upload-tts?page=<PAGE_NUMBER>&limit=<MAX_ROW>&order_by=<FIELD>&order_dir=<FIELD>
GET /yt-upload-tt/:id
POST /yt-upload-tt/create
POST /yt-upload-tt/update/:id?
POST /yt-upload-tt/delete/:id?

```

## createSchemaDef

```
createSchemaDef  <table_name> <pk> <columns> <types> [nullables] [lengths] [validations] [--schema=model_entities.json ]

Usage :
    createSchemaDef  <table_name> <pk> <columns> <types> [nullables] [lengths] [validations] [--schema=model_entities.json]
        table_name       Table name to be stored on the schema definition json
        pk       Primary key of the table
        columns          Column field list must be in array format [field1,field2,field3]
        types    Column field type must be in array format based on field index [int,varchar,datetime]
        nullables        Column field list wich nullable must be in array format [field1,field2] (default undefined)
        lengths          Column field length must be in array format based on field index [null,20,null] (default undefined)
        validations      Column field validation method to be created as validation model [[required,min=8],null,null] (default undefined)
        --schema=model_entities.json     flags (default ./model_entities.json)


./artisan createSchemaDef web_menu id [id,title,slug,link,target,parent,hidden,hasChild] [int,string,string,string,string,int,int,int] [hidden,hasChild] --schema=backend/src/api/data-source/config.json

./artisan createSchemaDef web_theme id [id,name,slug,description,previewImage] [int,varchar,varchar,varchar,varchar] --schema=backend/src/api/data-source/config.json

```

## createModelEntity

```
 createModelEntity  <table_name> <target_dir> [--schema] [--out-model-dir] [--out-entity-dir]
./artisan createModelEntity web_menu backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_theme backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_template backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_block backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_company backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_pages backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_contact_person backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json
./artisan createModelEntity web_site_setting backend/src/api/data-source/ --schema=backend/src/api/data-source/config.json

```

## createModelAPIRouteV3

```
./artisan createModelAPIRouteV3 web_menu backend/src/api/routes/ backend/src/api/data-source/config.json
./artisan createModelAPIRouteV3 web_theme backend/src/api/routes/ backend/src/api/data-source/config.json

```
