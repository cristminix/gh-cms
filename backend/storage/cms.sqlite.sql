BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user" (
	"id"	integer NOT NULL,
	"username"	varchar(25) NOT NULL,
	"passwd"	varchar(25),
	"email"	varchar(25) NOT NULL,
	"firstName"	varchar(25) NOT NULL,
	"lastName"	varchar(25),
	"displayName"	varchar(25),
	"avatarUrl"	varchar(25),
	"groupId"	integer,
	"createdBy"	integer,
	"createDate"	datetime,
	"lastUpdated"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "cms_setting" (
	"id"	integer NOT NULL,
	"profileName"	varchar(20) NOT NULL,
	"theme"	varchar(100) NOT NULL,
	"setAsDefault"	integer,
	"createDate"	datetime NOT NULL,
	"lastUpdated"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "yt_upload_data" (
	"id"	integer NOT NULL,
	"uploadId"	integer NOT NULL,
	"kind"	varchar NOT NULL,
	"content"	varchar NOT NULL,
	"createDate"	datetime,
	"owner"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "yt_upload" (
	"id"	integer NOT NULL,
	"title"	varchar(225) NOT NULL,
	"description"	varchar(400) NOT NULL,
	"category"	varchar,
	"tags"	varchar,
	"thumbnail"	varchar,
	"video"	varchar,
	"createDate"	datetime,
	"owner"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "yt_upload_tt" (
	"uploadId"	integer NOT NULL,
	"id"	integer NOT NULL,
	"title"	varchar(225) NOT NULL,
	"description"	varchar(400) NOT NULL,
	"thumbnail"	varchar NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_menu" (
	"id"	integer NOT NULL,
	"title"	varchar(225) NOT NULL,
	"slug"	varchar(500) NOT NULL,
	"link"	varchar(500) NOT NULL,
	"target"	varchar(10) NOT NULL,
	"parent"	integer NOT NULL,
	"hidden"	integer,
	"hasChild"	integer,
	"order"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_theme" (
	"id"	integer NOT NULL,
	"name"	varchar(225) NOT NULL,
	"slug"	varchar(500) NOT NULL,
	"description"	varchar(500),
	"previewImage"	varchar(500),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_template" (
	"id"	integer NOT NULL,
	"themeId"	integer NOT NULL,
	"name"	varchar(225) NOT NULL,
	"slug"	varchar(500) NOT NULL,
	"description"	varchar(500),
	"previewImage"	varchar(500),
	"path"	varchar(500) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_block" (
	"id"	integer NOT NULL,
	"parent"	integer,
	"name"	varchar(225) NOT NULL,
	"slug"	varchar(500) NOT NULL,
	"description"	varchar(500),
	"kind"	varchar(500) NOT NULL,
	"previewImage"	varchar(500),
	"path"	varchar(500),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_site_setting" (
	"id"	integer NOT NULL,
	"name"	varchar(225) NOT NULL,
	"slug"	varchar(500) NOT NULL,
	"theme"	varchar NOT NULL,
	"templateId"	integer NOT NULL,
	"companyId"	integer NOT NULL,
	"setAsDefault"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_contact_person" (
	"id"	integer NOT NULL,
	"siteId"	integer NOT NULL,
	"name"	varchar(225) NOT NULL,
	"shortName"	varchar(100),
	"kind"	varchar(50) NOT NULL,
	"contactDetail"	varchar(200) NOT NULL,
	"enabled"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_page" (
	"id"	integer NOT NULL,
	"templateId"	integer NOT NULL,
	"categories"	varchar(225),
	"tags"	varchar(100),
	"title"	varchar(225),
	"slug"	varchar(225),
	"description"	varchar(500),
	"authors"	varchar,
	"highlight"	varchar,
	"coverImage"	varchar(500),
	"content"	text NOT NULL,
	"kind"	varchar(100) NOT NULL,
	"path"	varchar(500),
	"status"	varchar(50),
	"visibility"	varchar(10),
	"dateCreated"	datetime,
	"dateUpdated"	datetime,
	"datePublished"	datetime,
	"relatedPages"	text,
	"relatedPosts"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_company" (
	"id"	integer NOT NULL,
	"name"	varchar(500) NOT NULL,
	"fullName"	varchar(500),
	"shortName"	varchar(500),
	"address"	varchar(500) NOT NULL,
	"altAddress"	varchar(500),
	"shortAddress"	varchar(500) NOT NULL,
	"slug"	varchar(500) NOT NULL,
	"phone"	varchar(500) NOT NULL,
	"altPhone"	varchar(500),
	"mobile"	varchar(500) NOT NULL,
	"altMobile"	varchar(500),
	"email"	varchar(500) NOT NULL,
	"altEmail"	varchar(500),
	"ig"	varchar(500) NOT NULL,
	"fb"	varchar(500) NOT NULL,
	"twitter"	varchar(500) NOT NULL,
	"youtube"	varchar(500) NOT NULL,
	"website"	varchar(500),
	"logo"	varchar(500),
	"logoSm"	varchar(500),
	"logoMd"	varchar(500),
	"logoXl"	varchar(500),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_template_block" (
	"id"	integer NOT NULL,
	"templateId"	integer NOT NULL,
	"blockId"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "web_section_block" (
	"id"	integer NOT NULL,
	"sectionId"	integer NOT NULL,
	"blockId"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (1,'sutoyocutez','1234','sutoyocutez@gmail.com','Sutoyo','Cutez','Sutoyo Cutez',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (2,'damar','password','damardotnet@gmail.com','Damar','Langit','Damar Sky',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (3,'jhonIQ7','seven','jhonIQ7@gmail.com','John','IQ7','John Aris',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (4,'anjoy','123','anjoy@gmail.com','Anjoy','Yani','Anjoy Yani',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (5,'bkent','123','bkent@gmail.cm','Brandon','Ken','Brandon Ken',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (6,'marfuah','132','marfuah@outlook.com','Marfu','Atun Hasanah','Marfuatn Hasanah',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (7,'nippon','123','nippon@nipponpaint.com','Nippon','Paint','Nipon Paint',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (8,'johan','1234','johana@gmail.com','Joh','Hana','Johana',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (9,'iklima','5678','iklima@gmail.com','Iklim','A','Iklima',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (10,'ajeng','1111','ajeng12@gmail.com','Ajeng','Kelin','Jeng Kelin',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (11,'mitro','1111','sumitro@gmail.com','Su','Mitro','Sumitro',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "user" ("id","username","passwd","email","firstName","lastName","displayName","avatarUrl","groupId","createdBy","createDate","lastUpdated") VALUES (12,'mirtazapin','333','mirtazapin@gmail.com','Mirta','Zapin','Mirta Zapin',NULL,NULL,NULL,NULL,NULL);
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (1,'Udah lama ga sekagum ini sama gadget 😭 - Unboxing Apple Vision Pro','Jir.

Kalau mau liat harga Apple Vision Pro: https://tokopedia.link/udYPFHD3fHb

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com','Motivasi','kreator,motivasi','e7b54d35d55f9d6f35b65206a485e577.webp','undefined',NULL,'sutoyocutez');
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (21,'HP Lipat yang ada logo APPLE 😎','Apple Vision Pro apa?

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com','uncategory','sample','ba98d39ad5f118c626bc2589f97033fd.webp','',NULL,NULL);
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (22,'Samsung lega OPPO ga masukin HP ini di Indonesia 😮‍💨','OPPO Flagship 👌

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com','uncategory','sample','eaea0afb39d3a9715db7e255713e6c33.webp','',NULL,NULL);
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (23,'Hardware GANAS 🤝 Software CERDAS - Review Samsung S24 Ultra Indonesia!','No spill spill.

Link pembelian Samsung Galaxy S24 Series: https://omgrefer.com/Hb9q7

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com
','uncategory','sample','2d1f28a8ff46c9160ffbe73b1f9efb7e.webp','',NULL,NULL);
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (24,'Penuh kenikmatan (dan sedikit masalah) - Review iPhone 15 Pro Indonesia!','Fans Android pun hepi.

Dapetin pengalaman baru nikmatin Kopi Kapal Api One disini: https://www.klikindomaret.com/product...

Analisa K2G before after update iOS 17.0.3:   
 • iPhone 15 Pro Max Problem? After Upda...  

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com','uncategory','sample','242a194109c335fd3ef30effefc113af.webp','',NULL,NULL);
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (25,'Rekomendasi HP TERBAIK buat akhir 2023/ awal 2024!','Udah mendingan ga banyak juara bertahan.

Dapetin Kapal Api One disini: https://www.tokopedia.com/kapalapisto...

0 - 1,5juta : https://tokopedia.link/quXFfCbSvFb
https://tokopedia.link/xg7ksqdSvFb
1,5 - 2juta : https://tokopedia.link/ChgiV9hSvFb
https://tokopedia.link/FcAziWgB2Bb
2 - 3juta : https://tokopedia.link/XP25FlkSvFb
https://tokopedia.link/t0JAsalSvFb
3 - 4juta : https://tokopedia.link/d8adFmnSvFb
4 - 5juta : https://tokopedia.link/N6gn5WuSvFb
5 - 6juta : https://tokopedia.link/tPQSHzwSvFb
6 - 8juta : https://tokopedia.link/zEyFJCySvFb
8 - 10juta : https://tokopedia.link/RT8YkFBSvFb
https://tokopedia.link/LlfwuSPsbEb
10 - 15juta : https://tokopedia.link/OmHh0oESvFb
15juta++ : 
https://tokopedia.link/VRW3oSKSvFb
https://tokopedia.link/VZIChsLSvFb
https://tokopedia.link/vn9cpVLSvFb
https://tokopedia.link/5xNjTsMSvFb

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com','uncategory','sample','edfed3fba7da2008ae402e48146ff59b.webp','',NULL,NULL);
INSERT INTO "yt_upload" ("id","title","description","category","tags","thumbnail","video","createDate","owner") VALUES (57,'Building React Tree Table App with CRUD Features','Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. ','Sains & Technology','react,tree-table,tree-grid','90254c0ece437df2f08f02405a8f8008.png','undefined',NULL,NULL);
INSERT INTO "yt_upload_tt" ("uploadId","id","title","description","thumbnail") VALUES (1,1,'Udah lama ga sekagum ini sama gadget 😭 - Unboxing Apple Vision Pro','Jir.

Kalau mau liat harga Apple Vision Pro: https://tokopedia.link/udYPFHD3fHb

Barang bekas review biasanya saya jual disini: https://invol.co/cl75vrb

Beberapa toko HP yang oke (kejual puluhan ribu unit + rating tinggi):
https://tokopedia.link/AKIOook8Qvb
https://tokopedia.link/anYzx6q8Qvb
https://tokopedia.link/iD40kiC8Qvb
https://tokopedia.link/DP7QokS8Qvb
https://tokopedia.link/pMWv2tU8Qvb

Instagram GadgetIn:  

 / gadgetins   
Twitter GadgetIn:  

 / dgadgetin   
Facebook GadgetIn:  

 / dgadgetin  

Email untuk kerjasama: davidbrendi88@gmail.com','29f6d54ca626d956e638d92caed7b4a1.webp');
INSERT INTO "yt_upload_tt" ("uploadId","id","title","description","thumbnail") VALUES (57,26,'Building React Tree Table App with CRUD Features (#1709179844411)','Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. ','1709179844411-90254c0ece437df2f08f02405a8f8008.png');
INSERT INTO "yt_upload_tt" ("uploadId","id","title","description","thumbnail") VALUES (57,28,'Building React Tree Table App with CRUD Features (#1709182576932) (#1709183408804)','Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. ','cb8f229d3ca076a391d45d5ed5255112.png');
INSERT INTO "yt_upload_tt" ("uploadId","id","title","description","thumbnail") VALUES (57,33,'How To Create React Tree Table App with CRUD Features ','Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. We use Indexed DB as Application Storage. Such a beautiful day Tailwind CSS made easy to cosmetics User Interface with predefine Tailwind CSS Framework Called Preline.','5acd29f2c86d0f299fdc474972ef2c40.png');
INSERT INTO "yt_upload_tt" ("uploadId","id","title","description","thumbnail") VALUES (57,34,'How To Build React & Tailwind Tree Table App with Form And CRUD Features','Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. We use Indexed DB as Application Storage. Such a beautiful day Tailwind CSS made easy to cosmetics User Interface with predefine Tailwind CSS Framework Called Preline.','bed61d7d61b5c398023ed38a4af3400d.png');
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (1,'Home','home','/','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (2,'Profil','profile','/profile','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (3,'Lembaga','lembaga','/lembaga','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (4,'Kegiatan','kegiatan','/kegiatan','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (5,'Pendaftaran','pendaftaran','/pendaftaran','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (6,'Galeri','galeri','/galeri','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (7,'Berita','berita','/berita','self',-1,NULL,0,0);
INSERT INTO "web_menu" ("id","title","slug","link","target","parent","hidden","hasChild","order") VALUES (8,'Kontak','kontak','/kontak','self',-1,NULL,0,0);
INSERT INTO "web_theme" ("id","name","slug","description","previewImage") VALUES (1,'Green Ponpes','green-ponpes','Responsive green template for islamic boarding school website','eab84272ac428332def9f3f4f6487900.png');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (1,1,'Homepage','homepage','Homepage','46580d57f7358763403887514afe0725.png','homepage.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (2,1,'Profile','Profile','Profile','76817043776e8b39b324ddd45df7c7b6.png','profile.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (3,1,'Lembaga','lembaga','Lembaga','0c402c41f273dfeddb56afd479254946.png','lembaga.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (4,1,'Kegiatan','kegiatan','Kegiatan','6ac9fe1b8e8831380d188efd01167a39.png','kegiatan.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (5,1,'Pendaftaran','pendaftaran','Pendaftaran','86a283726a4bfd10c9c395aeb96a2ad2.png','pendaftaran.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (6,1,'Galeri','galeri','Galeri','6ceae621204601d91899776098db79f2.png','galery.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (7,1,'Berita','berita','Berita','49becc30b481d6e17bec41da9a34e905.png','berita.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (8,1,'Lihat Berita','lihat-berita','Lihat Berita','becc4768010f35ca9751509d263e87d9.png','lihat-berita.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (9,1,'Search Result','search-result','Search Result','c58deada549ea929c6db9b4589884f0f.png','search-result.twig');
INSERT INTO "web_template" ("id","themeId","name","slug","description","previewImage","path") VALUES (10,1,'Kontak','kontak','Kontak','62d47188248ba25c2262bc0c3fd1604f.png','kontak.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (1,NULL,'Top Company Short Address','company-short-address','Display company name with company address city and province','block','c018eee154805dc6491893ffc683b641.png','company-short-address.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (2,NULL,'Brand','brand','Display company logo as brand','block','ccdcb3a40ab081d1303b3a381186a5e5.png','brand.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (3,NULL,'Web Main Menu Bar','web-main-menu-bar','Display main menu for website','block','1c6665f61a2d993aa2d2a740c15009d9.png','main-web-menubar-twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (4,NULL,'Main Menu Search Button','main-menu-search-button','Display search button with icon in main menu bar','block','151d6ce5fa65e2346f01c393594395cb.png','main-menu-search-button.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (5,NULL,'Image Caraousel Slide','homepage-image-caraousel-slide','Display image carousel slides','block','3c39ecbe0aabb0e12910cfca16c54aee.png','homepage-image-caraousel-slide.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (6,NULL,'Welcome Message Banner','welcome-message-banner','Display welcome message','block','d6531e72d38e37808da689d4594b7bd1.png','welcome-message-banner.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (7,NULL,'Short Company Profile','short-company-profile','Display short of about company profile','block','e6f2a2a4b8015b06f55b3f16b9e97ec6.png','short-company-profile.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (8,NULL,'Auto Scroll Image Galery','custom-caption-autoscroll-image-galery','Auto scroll image galery with custom caption','block','1b5c6c73b536d443c9cf72ae9762bc18.png','custom-caption-autoscroll-image-galery.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (9,NULL,'Company Department Icon List','company-department-icon-list','Display company department in icon list','block','ccdb52aaad05a369a029d423605862f4.png','company-department-icon-list.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (10,NULL,'News Post Card List','news-post-with-cover-image-card-list','Display news and posts in card list mode','block','e84d6fe6b077c9ad3cc88e9660a77799.png','news-post-with-cover-image-card-list.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (11,NULL,'Footer Brand','footer-brand','Display small company brand image in footer','block','be542edf8c4e57f322a01509127542e8.png','footer-brand.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (12,NULL,'Footer Social Net Buttons','footer-social-net-buttons','Display social list of network buttons on footer','block','8f6123cd8ec881e32c342678dd32b5ea.png','footer-social-net-buttons.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (13,NULL,'Top Social Net Button List','top-social-net-button-list','Display list of social network buttons on top','block','a5fef1e9fe97c6d8b53878a09e201447.png','top-social-net-button-list.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (14,NULL,'Floating Contact Buttons','floating-contact-buttons','Display floating contact buttons on page for accessing phone, mobile or whatsapp number','block','5be0d946e5245604fbccfb586c3e5627.png','floating-contact-buttons.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (15,NULL,'Floating Go To Top Button','floating-go-to-top-button','Display go to top button on the bottom right of the page to scroll current page to the top of the page','block','d368b7c3c96a51ec415b17feaec40baf.png','floating-go-to-top-button.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (16,NULL,'Footer Full Company Address','footer-full-company-address','Display full company address on the footer section','block','eb1ebf2e84e091a2249a3bf0c85e98c1.png','footer-full-company-address.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (17,NULL,'Footer Contact Person With Company Email','footer-contact-person-list-with-company-email','Display contact person with company email on the footer section','block','0cd2c75a0d3acb698582e8cc8e47032a.png','footer-contact-person-list-with-company-email.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (18,NULL,'Top Bar Section','top-bar-section','Display top bar','section','2277b7c6e207484b6e38ef7cf55c8cae.png','top-bar-section');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (19,NULL,'Header Section','header-section','Display header','section','1a56c4ea1afd118742fa756298fe36e4.png','header-section.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (20,NULL,'Main Content','main-content','Display main content on homepage','section','616db5662814082368363d6dacd3d020.png','main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (21,NULL,'Footer Section','footer-section','Display Footer Section on Homepage','section','4e0b3cf05efbe18b774b4cbf036c8995.png','footer-section');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (22,NULL,'Floating Toolbar Button','floating-toolbar-button','Display floating toolbar on homepage','section','7d6d2a47884867416cbf53fe9b5889c6.png','floating-toolbar-button');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (30,NULL,'Profile Main Content','profile-main-content','Display main content for profile page','section','60772da8dee21d6495d2af0e453d6270.png','profile-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (31,NULL,'Lembaga Main Content','lembaga-main-content','Display main content for lembaga page','section','c6fd5b5b703154043b2b671861f75ee9.png','lembaga-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (32,NULL,'Kegiatan Main Content','kegiatan-main-content','Display kegiatan main content','section','f0c4cda686e524c4a749e984a7443b42.png','kegiatan-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (33,NULL,'Pendafataran Main Content','pendaftaran-main-content','Display pendaftaran main content','section','14b03963e9616e48798f48f264e75ca1.png','pendaftaran-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (34,NULL,'Galery Main Content','galery-main-content','Display Galery Main Content','section','5cc516f7bb854770980be6b00d5acbb0.png','galery-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (35,NULL,'Berita Main Content','berita-main-content','Display berita main content','section','dc884e3fb5e672fd1fb80181c00eb0a9.png','berita-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (36,NULL,'Lihat Berita Main Content','lihat-berita-main-content','Display lihat berita main content','section','7058b901a6ef754f128ebdadd84e5c9a.png','lihat-berita-main-content.twig');
INSERT INTO "web_block" ("id","parent","name","slug","description","kind","previewImage","path") VALUES (37,NULL,'Search Result Main Content','search-result-main-content','Display search results main content','section','85875a0f5a2e6d83a48517729c9a3920.png','search-result-main-content.twig');
INSERT INTO "web_page" ("id","templateId","categories","tags","title","slug","description","authors","highlight","coverImage","content","kind","path","status","visibility","dateCreated","dateUpdated","datePublished","relatedPages","relatedPosts") VALUES (1,1,NULL,NULL,'Untitled-596e7fa8','untitled-596e7fa8','Blah','Putra B',NULL,NULL,'Blah','html',NULL,'draft','public','0NaN-aN-aN aN:aN:aN.NaN','0NaN-aN-aN aN:aN:aN.NaN','0NaN-aN-aN aN:aN:aN.NaN',NULL,NULL);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (1,1,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (2,1,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (3,1,20);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (4,1,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (5,1,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (7,2,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (8,2,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (9,2,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (10,2,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (11,2,30);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (12,3,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (13,3,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (14,3,31);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (15,3,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (16,3,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (17,4,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (18,4,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (19,4,32);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (20,4,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (21,4,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (22,5,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (23,5,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (24,5,33);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (25,5,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (26,5,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (27,6,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (28,6,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (29,6,34);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (30,6,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (31,6,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (32,7,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (33,7,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (34,7,35);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (35,7,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (36,7,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (37,8,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (38,8,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (39,8,36);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (40,8,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (41,8,22);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (42,9,18);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (43,9,19);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (44,9,37);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (45,9,21);
INSERT INTO "web_template_block" ("id","templateId","blockId") VALUES (46,9,22);
COMMIT;
