/*
 Navicat Premium Data Transfer

 Source Server         : cms
 Source Server Type    : SQLite
 Source Server Version : 3035005 (3.35.5)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3035005 (3.35.5)
 File Encoding         : 65001

 Date: 25/03/2024 09:34:22
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for cms_setting
-- ----------------------------
DROP TABLE IF EXISTS "cms_setting";
CREATE TABLE "cms_setting" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "profileName" varchar(20) NOT NULL,
  "theme" varchar(100) NOT NULL,
  "setAsDefault" integer,
  "createDate" datetime NOT NULL,
  "lastUpdated" datetime NOT NULL
);

-- ----------------------------
-- Records of cms_setting
-- ----------------------------

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE "sqlite_sequence" (
  "name",
  "seq"
);

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
INSERT INTO "sqlite_sequence" VALUES ('user', 12);
INSERT INTO "sqlite_sequence" VALUES ('yt_upload', 57);
INSERT INTO "sqlite_sequence" VALUES ('yt_upload_tt', 34);
INSERT INTO "sqlite_sequence" VALUES ('web_menu', 8);
INSERT INTO "sqlite_sequence" VALUES ('web_theme', 1);
INSERT INTO "sqlite_sequence" VALUES ('web_template', 10);
INSERT INTO "sqlite_sequence" VALUES ('web_block', 43);
INSERT INTO "sqlite_sequence" VALUES ('web_page', 1);
INSERT INTO "sqlite_sequence" VALUES ('web_company', 1);
INSERT INTO "sqlite_sequence" VALUES ('web_site_setting', 1);
INSERT INTO "sqlite_sequence" VALUES ('web_contact_person', 3);
INSERT INTO "sqlite_sequence" VALUES ('web_template_block', 46);
INSERT INTO "sqlite_sequence" VALUES ('web_section_block', 28);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "username" varchar(25) NOT NULL,
  "passwd" varchar(25),
  "email" varchar(25) NOT NULL,
  "firstName" varchar(25) NOT NULL,
  "lastName" varchar(25),
  "displayName" varchar(25),
  "avatarUrl" varchar(25),
  "groupId" integer,
  "createdBy" integer,
  "createDate" datetime,
  "lastUpdated" datetime
);

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "user" VALUES (1, 'sutoyocutez', '1234', 'sutoyocutez@gmail.com', 'Sutoyo', 'Cutez', 'Sutoyo Cutez', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (2, 'damar', 'password', 'damardotnet@gmail.com', 'Damar', 'Langit', 'Damar Sky', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (3, 'jhonIQ7', 'seven', 'jhonIQ7@gmail.com', 'John', 'IQ7', 'John Aris', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (4, 'anjoy', '123', 'anjoy@gmail.com', 'Anjoy', 'Yani', 'Anjoy Yani', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (5, 'bkent', '123', 'bkent@gmail.cm', 'Brandon', 'Ken', 'Brandon Ken', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (6, 'marfuah', '132', 'marfuah@outlook.com', 'Marfu', 'Atun Hasanah', 'Marfuatn Hasanah', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (7, 'nippon', '123', 'nippon@nipponpaint.com', 'Nippon', 'Paint', 'Nipon Paint', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (8, 'johan', '1234', 'johana@gmail.com', 'Joh', 'Hana', 'Johana', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (9, 'iklima', '5678', 'iklima@gmail.com', 'Iklim', 'A', 'Iklima', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (10, 'ajeng', '1111', 'ajeng12@gmail.com', 'Ajeng', 'Kelin', 'Jeng Kelin', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (11, 'mitro', '1111', 'sumitro@gmail.com', 'Su', 'Mitro', 'Sumitro', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "user" VALUES (12, 'mirtazapin', '333', 'mirtazapin@gmail.com', 'Mirta', 'Zapin', 'Mirta Zapin', NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for web_block
-- ----------------------------
DROP TABLE IF EXISTS "web_block";
CREATE TABLE "web_block" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "parent" integer,
  "name" varchar(225) NOT NULL,
  "slug" varchar(500) NOT NULL,
  "description" varchar(500),
  "kind" varchar(500) NOT NULL,
  "previewImage" varchar(500),
  "path" varchar(500)
);

-- ----------------------------
-- Records of web_block
-- ----------------------------
INSERT INTO "web_block" VALUES (1, NULL, 'Top Company Short Address', 'company-short-address', 'Display company name with company address city and province', 'block', 'c018eee154805dc6491893ffc683b641.png', 'company-short-address.twig');
INSERT INTO "web_block" VALUES (2, NULL, 'Brand', 'brand', 'Display company logo as brand', 'block', 'ccdcb3a40ab081d1303b3a381186a5e5.png', 'brand.twig');
INSERT INTO "web_block" VALUES (3, NULL, 'Web Main Menu Bar', 'web-main-menu-bar', 'Display main menu for website', 'block', '1c6665f61a2d993aa2d2a740c15009d9.png', 'main-web-menubar.twig');
INSERT INTO "web_block" VALUES (4, NULL, 'Main Menu Search Button', 'main-menu-search-button', 'Display search button with icon in main menu bar', 'block', '151d6ce5fa65e2346f01c393594395cb.png', 'main-menu-search-button.twig');
INSERT INTO "web_block" VALUES (5, NULL, 'Image Caraousel Slide', 'homepage-image-caraousel-slide', 'Display image carousel slides', 'block', '3c39ecbe0aabb0e12910cfca16c54aee.png', 'homepage-image-caraousel-slide.twig');
INSERT INTO "web_block" VALUES (6, NULL, 'Welcome Message Banner', 'welcome-message-banner', 'Display welcome message', 'block', 'd6531e72d38e37808da689d4594b7bd1.png', 'welcome-message-banner.twig');
INSERT INTO "web_block" VALUES (7, NULL, 'Short Company Profile', 'short-company-profile', 'Display short of about company profile', 'block', 'e6f2a2a4b8015b06f55b3f16b9e97ec6.png', 'short-company-profile.twig');
INSERT INTO "web_block" VALUES (8, NULL, 'Auto Scroll Image Galery', 'custom-caption-autoscroll-image-galery', 'Auto scroll image galery with custom caption', 'block', '1b5c6c73b536d443c9cf72ae9762bc18.png', 'custom-caption-autoscroll-image-galery.twig');
INSERT INTO "web_block" VALUES (9, NULL, 'Company Department Icon List', 'company-department-icon-list', 'Display company department in icon list', 'block', '951d5250e54136f058c9bb741c459044.png', 'company-department-icon-list.twig');
INSERT INTO "web_block" VALUES (10, NULL, 'News Post Card List', 'news-post-with-cover-image-card-list', 'Display news and posts in card list mode', 'block', 'e84d6fe6b077c9ad3cc88e9660a77799.png', 'news-post-with-cover-image-card-list.twig');
INSERT INTO "web_block" VALUES (11, NULL, 'Footer Brand', 'footer-brand', 'Display small company brand image in footer', 'block', 'be542edf8c4e57f322a01509127542e8.png', 'footer-brand.twig');
INSERT INTO "web_block" VALUES (12, NULL, 'Footer Social Net Buttons', 'footer-social-net-buttons', 'Display social list of network buttons on footer', 'block', '8f6123cd8ec881e32c342678dd32b5ea.png', 'footer-social-net-buttons.twig');
INSERT INTO "web_block" VALUES (13, NULL, 'Top Social Net Button List', 'top-social-net-button-list', 'Display list of social network buttons on top', 'block', 'a5fef1e9fe97c6d8b53878a09e201447.png', 'top-social-net-button-list.twig');
INSERT INTO "web_block" VALUES (14, NULL, 'Floating Contact Buttons', 'floating-contact-buttons', 'Display floating contact buttons on page for accessing phone, mobile or whatsapp number', 'block', '5be0d946e5245604fbccfb586c3e5627.png', 'floating-contact-buttons.twig');
INSERT INTO "web_block" VALUES (15, NULL, 'Floating Go To Top Button', 'floating-go-to-top-button', 'Display go to top button on the bottom right of the page to scroll current page to the top of the page', 'block', 'd368b7c3c96a51ec415b17feaec40baf.png', 'floating-go-to-top-button.twig');
INSERT INTO "web_block" VALUES (16, NULL, 'Footer Full Company Address', 'footer-full-company-address', 'Display full company address on the footer section', 'block', 'eb1ebf2e84e091a2249a3bf0c85e98c1.png', 'footer-full-company-address.twig');
INSERT INTO "web_block" VALUES (17, NULL, 'Footer Contact Person With Company Email', 'footer-contact-person-list-with-company-email', 'Display contact person with company email on the footer section', 'block', '0cd2c75a0d3acb698582e8cc8e47032a.png', 'footer-contact-person-list-with-company-email.twig');
INSERT INTO "web_block" VALUES (18, NULL, 'Top Bar Section', 'top-bar-section', 'Display top bar', 'section', '2277b7c6e207484b6e38ef7cf55c8cae.png', 'top-bar-section.twig');
INSERT INTO "web_block" VALUES (19, NULL, 'Header Section', 'header-section', 'Display header', 'section', '1a56c4ea1afd118742fa756298fe36e4.png', 'header-section.twig');
INSERT INTO "web_block" VALUES (20, NULL, 'Main Content', 'homepage-main-content', 'Display main content on homepage', 'section', '616db5662814082368363d6dacd3d020.png', 'homepage-main-content.twig');
INSERT INTO "web_block" VALUES (21, NULL, 'Footer Section', 'footer-section', 'Display Footer Section on Homepage', 'section', '4e0b3cf05efbe18b774b4cbf036c8995.png', 'footer-section.twig');
INSERT INTO "web_block" VALUES (22, NULL, 'Floating Toolbar Button', 'floating-toolbar-button', 'Display floating toolbar on homepage', 'section', '7d6d2a47884867416cbf53fe9b5889c6.png', 'floating-toolbar-button.twig');
INSERT INTO "web_block" VALUES (30, NULL, 'Profile Main Content', 'profile-main-content', 'Display main content for profile page', 'section', '60772da8dee21d6495d2af0e453d6270.png', 'profile-main-content.twig');
INSERT INTO "web_block" VALUES (31, NULL, 'Lembaga Main Content', 'lembaga-main-content', 'Display main content for lembaga page', 'section', 'c6fd5b5b703154043b2b671861f75ee9.png', 'lembaga-main-content.twig');
INSERT INTO "web_block" VALUES (32, NULL, 'Kegiatan Main Content', 'kegiatan-main-content', 'Display kegiatan main content', 'section', 'f0c4cda686e524c4a749e984a7443b42.png', 'kegiatan-main-content.twig');
INSERT INTO "web_block" VALUES (33, NULL, 'Pendafataran Main Content', 'pendaftaran-main-content', 'Display pendaftaran main content', 'section', '14b03963e9616e48798f48f264e75ca1.png', 'pendaftaran-main-content.twig');
INSERT INTO "web_block" VALUES (34, NULL, 'Galery Main Content', 'galery-main-content', 'Display Galery Main Content', 'section', '5cc516f7bb854770980be6b00d5acbb0.png', 'galery-main-content.twig');
INSERT INTO "web_block" VALUES (35, NULL, 'Berita Main Content', 'berita-main-content', 'Display berita main content', 'section', 'dc884e3fb5e672fd1fb80181c00eb0a9.png', 'berita-main-content.twig');
INSERT INTO "web_block" VALUES (36, NULL, 'Lihat Berita Main Content', 'lihat-berita-main-content', 'Display lihat berita main content', 'section', '7058b901a6ef754f128ebdadd84e5c9a.png', 'lihat-berita-main-content.twig');
INSERT INTO "web_block" VALUES (37, NULL, 'Search Result Main Content', 'search-result-main-content', 'Display search results main content', 'section', '85875a0f5a2e6d83a48517729c9a3920.png', 'search-result-main-content.twig');
INSERT INTO "web_block" VALUES (38, NULL, 'Visi dan Misi', 'visi-misi', 'Display visi dan misi', 'block', '1b1a1ffa4b78b9aa4ca344533ff62e72.png', 'visi-misi.twig');
INSERT INTO "web_block" VALUES (39, NULL, 'main-company-banner', 'main-company-banner', 'Display main company banner', 'block', 'b322c1ae67a923478993ff16badcea42.png', 'main-company-banner.twig');
INSERT INTO "web_block" VALUES (40, NULL, 'Main Breadcrumb', 'main-breadcrumb', 'Display main breadcrumb', 'block', 'ae6baaa1fb8dc24a7341bd17ce9f7720.png', 'main-breadcrumb.twig');
INSERT INTO "web_block" VALUES (41, NULL, 'Lembaga Formal', 'lembaga-formal', 'Display lembaga formal', 'block', '6f26ce410f9e6bc3624d3b15fccd0560.png', 'lembaga-formal.twig');
INSERT INTO "web_block" VALUES (42, NULL, 'Lembaga Non Formal', 'lembaga-non-formal', 'Display lembaga non formal', 'block', '62f5b1c731e58df9251e41f36279dde7.png', 'lembaga-non-formal.twig');
INSERT INTO "web_block" VALUES (43, NULL, 'Static Breadcrumb', 'static-breadcrumb', 'Display static breadcrumb', 'block', '679969d6c64ff1b1c808c36fe98c4c16.png', 'static-breadcrumb.twig');

-- ----------------------------
-- Table structure for web_company
-- ----------------------------
DROP TABLE IF EXISTS "web_company";
CREATE TABLE "web_company" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(500) NOT NULL,
  "fullName" varchar(500),
  "shortName" varchar(500),
  "address" varchar(500) NOT NULL,
  "altAddress" varchar(500),
  "shortAddress" varchar(500) NOT NULL,
  "slug" varchar(500) NOT NULL,
  "phone" varchar(500) NOT NULL,
  "altPhone" varchar(500),
  "mobile" varchar(500) NOT NULL,
  "altMobile" varchar(500),
  "email" varchar(500) NOT NULL,
  "altEmail" varchar(500),
  "ig" varchar(500) NOT NULL,
  "fb" varchar(500) NOT NULL,
  "twitter" varchar(500) NOT NULL,
  "youtube" varchar(500) NOT NULL,
  "website" varchar(500),
  "logo" varchar(500),
  "logoSm" varchar(500),
  "logoMd" varchar(500),
  "logoXl" varchar(500)
);

-- ----------------------------
-- Records of web_company
-- ----------------------------
INSERT INTO "web_company" VALUES (1, 'Kanzul Ulum', 'Pondok Pesantren Kanzul Ulum', 'Ponpes Kanzul Ulum', 'Jl. Pramuka No.110, RT.003 / RW.005, Desa Jatibarang Kidul, Kec. Jatibarang, Kab. Cirebon 52261.', '', 'Kota Cirebon', 'kanzul-ulum', '', '', '', '', 'kanzululum@gmail.com', '', 'ponpes.kanzululum', 'PonpesKanzulUlum', 'kanzululum', 'kanzululum', '', '{themeUrl}/images/logo/logo.png', '{themeUrl}/images/logo-sm.png', '{themeUrl}/images/logo-md.png', '{themeUrl}/images/logo-xl.png');

-- ----------------------------
-- Table structure for web_contact_person
-- ----------------------------
DROP TABLE IF EXISTS "web_contact_person";
CREATE TABLE "web_contact_person" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "siteId" integer NOT NULL,
  "name" varchar(225) NOT NULL,
  "shortName" varchar(100),
  "kind" varchar(50) NOT NULL,
  "contactDetail" varchar(200) NOT NULL,
  "enabled" integer
);

-- ----------------------------
-- Records of web_contact_person
-- ----------------------------
INSERT INTO "web_contact_person" VALUES (1, 1, 'Muhamad Ulul Fahmi', 'M. Ulul Fahmi', 'mobile', '+62 857-4107-0076', 1);
INSERT INTO "web_contact_person" VALUES (2, 1, 'Imam Nakhrowi', 'Imam Nakhrowi', 'mobile', '+62 821-3844-5528 ', 1);
INSERT INTO "web_contact_person" VALUES (3, 1, 'Ahmad Abdul Ghofur', 'Ahmad A. Ghofur', 'mobile', '+62 896-1719-1635 ', 1);

-- ----------------------------
-- Table structure for web_menu
-- ----------------------------
DROP TABLE IF EXISTS "web_menu";
CREATE TABLE "web_menu" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" varchar(225) NOT NULL,
  "slug" varchar(500) NOT NULL,
  "link" varchar(500) NOT NULL,
  "target" varchar(10) NOT NULL,
  "parent" integer NOT NULL,
  "hidden" integer,
  "hasChild" integer,
  "order" integer
);

-- ----------------------------
-- Records of web_menu
-- ----------------------------
INSERT INTO "web_menu" VALUES (1, 'Home', 'home', '/', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (2, 'Profil', 'profile', '/profile', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (3, 'Lembaga', 'lembaga', '/lembaga', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (4, 'Kegiatan', 'kegiatan', '/kegiatan', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (5, 'Pendaftaran', 'pendaftaran', '/pendaftaran', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (6, 'Galeri', 'galeri', '/galeri', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (7, 'Berita', 'berita', '/berita', 'self', -1, NULL, 0, 0);
INSERT INTO "web_menu" VALUES (8, 'Kontak', 'kontak', '/kontak', 'self', -1, NULL, 0, 0);

-- ----------------------------
-- Table structure for web_page
-- ----------------------------
DROP TABLE IF EXISTS "web_page";
CREATE TABLE "web_page" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "templateId" integer NOT NULL,
  "categories" varchar(225),
  "tags" varchar(100),
  "title" varchar(225),
  "slug" varchar(225),
  "description" varchar(500),
  "authors" varchar,
  "highlight" varchar,
  "coverImage" varchar(500),
  "content" text NOT NULL,
  "kind" varchar(100) NOT NULL,
  "path" varchar(500),
  "status" varchar(50),
  "visibility" varchar(10),
  "dateCreated" datetime,
  "dateUpdated" datetime,
  "datePublished" datetime,
  "relatedPages" text,
  "relatedPosts" text
);

-- ----------------------------
-- Records of web_page
-- ----------------------------
INSERT INTO "web_page" VALUES (1, 1, NULL, NULL, 'Untitled-596e7fa8', 'untitled-596e7fa8', 'Blah', 'Putra B', NULL, NULL, 'Blah', 'html', NULL, 'draft', 'public', '0NaN-aN-aN aN:aN:aN.NaN', '0NaN-aN-aN aN:aN:aN.NaN', '0NaN-aN-aN aN:aN:aN.NaN', NULL, NULL);

-- ----------------------------
-- Table structure for web_section_block
-- ----------------------------
DROP TABLE IF EXISTS "web_section_block";
CREATE TABLE "web_section_block" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "sectionId" integer NOT NULL,
  "blockId" integer NOT NULL,
  "templateData" text
);

-- ----------------------------
-- Records of web_section_block
-- ----------------------------
INSERT INTO "web_section_block" VALUES (1, 18, 1, NULL);
INSERT INTO "web_section_block" VALUES (2, 18, 13, NULL);
INSERT INTO "web_section_block" VALUES (3, 19, 2, NULL);
INSERT INTO "web_section_block" VALUES (4, 19, 3, NULL);
INSERT INTO "web_section_block" VALUES (5, 19, 4, NULL);
INSERT INTO "web_section_block" VALUES (6, 20, 5, NULL);
INSERT INTO "web_section_block" VALUES (7, 20, 6, NULL);
INSERT INTO "web_section_block" VALUES (8, 20, 7, NULL);
INSERT INTO "web_section_block" VALUES (9, 20, 8, NULL);
INSERT INTO "web_section_block" VALUES (10, 20, 9, NULL);
INSERT INTO "web_section_block" VALUES (11, 20, 10, NULL);
INSERT INTO "web_section_block" VALUES (12, 21, 11, NULL);
INSERT INTO "web_section_block" VALUES (13, 21, 12, NULL);
INSERT INTO "web_section_block" VALUES (14, 21, 16, NULL);
INSERT INTO "web_section_block" VALUES (15, 21, 17, NULL);
INSERT INTO "web_section_block" VALUES (16, 22, 14, NULL);
INSERT INTO "web_section_block" VALUES (17, 22, 15, NULL);
INSERT INTO "web_section_block" VALUES (18, 30, 7, NULL);
INSERT INTO "web_section_block" VALUES (19, 30, 38, NULL);
INSERT INTO "web_section_block" VALUES (20, 31, 39, NULL);
INSERT INTO "web_section_block" VALUES (21, 31, 40, NULL);
INSERT INTO "web_section_block" VALUES (22, 31, 41, NULL);
INSERT INTO "web_section_block" VALUES (23, 31, 42, NULL);
INSERT INTO "web_section_block" VALUES (24, 30, 39, NULL);
INSERT INTO "web_section_block" VALUES (25, 30, 40, NULL);
INSERT INTO "web_section_block" VALUES (26, 20, 39, NULL);
INSERT INTO "web_section_block" VALUES (27, 20, 40, NULL);
INSERT INTO "web_section_block" VALUES (28, 20, 43, NULL);

-- ----------------------------
-- Table structure for web_site_setting
-- ----------------------------
DROP TABLE IF EXISTS "web_site_setting";
CREATE TABLE "web_site_setting" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(225) NOT NULL,
  "slug" varchar(500) NOT NULL,
  "theme" varchar NOT NULL,
  "companyId" integer NOT NULL,
  "setAsDefault" integer NOT NULL
);

-- ----------------------------
-- Records of web_site_setting
-- ----------------------------
INSERT INTO "web_site_setting" VALUES (1, 'Website Ponpes Kanzul Ulum', 'website-ponpes-kanzul-ulum', 'green-ponpes', 1, 1);

-- ----------------------------
-- Table structure for web_template
-- ----------------------------
DROP TABLE IF EXISTS "web_template";
CREATE TABLE "web_template" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "themeId" integer NOT NULL,
  "name" varchar(225) NOT NULL,
  "slug" varchar(500) NOT NULL,
  "description" varchar(500),
  "previewImage" varchar(500),
  "path" varchar(500) NOT NULL
);

-- ----------------------------
-- Records of web_template
-- ----------------------------
INSERT INTO "web_template" VALUES (1, 1, 'Homepage', 'homepage', 'Homepage', '46580d57f7358763403887514afe0725.png', 'homepage.twig');
INSERT INTO "web_template" VALUES (2, 1, 'Profile', 'profile', 'Profile', '76817043776e8b39b324ddd45df7c7b6.png', 'profile.twig');
INSERT INTO "web_template" VALUES (3, 1, 'Lembaga', 'lembaga', 'Lembaga', '0c402c41f273dfeddb56afd479254946.png', 'lembaga.twig');
INSERT INTO "web_template" VALUES (4, 1, 'Kegiatan', 'kegiatan', 'Kegiatan', '6ac9fe1b8e8831380d188efd01167a39.png', 'kegiatan.twig');
INSERT INTO "web_template" VALUES (5, 1, 'Pendaftaran', 'pendaftaran', 'Pendaftaran', '86a283726a4bfd10c9c395aeb96a2ad2.png', 'pendaftaran.twig');
INSERT INTO "web_template" VALUES (6, 1, 'Galeri', 'galeri', 'Galeri', '6ceae621204601d91899776098db79f2.png', 'galery.twig');
INSERT INTO "web_template" VALUES (7, 1, 'Berita', 'berita', 'Berita', '49becc30b481d6e17bec41da9a34e905.png', 'berita.twig');
INSERT INTO "web_template" VALUES (8, 1, 'Lihat Berita', 'lihat-berita', 'Lihat Berita', 'becc4768010f35ca9751509d263e87d9.png', 'lihat-berita.twig');
INSERT INTO "web_template" VALUES (9, 1, 'Search Result', 'search-result', 'Search Result', 'c58deada549ea929c6db9b4589884f0f.png', 'search-result.twig');
INSERT INTO "web_template" VALUES (10, 1, 'Kontak', 'kontak', 'Kontak', '62d47188248ba25c2262bc0c3fd1604f.png', 'kontak.twig');

-- ----------------------------
-- Table structure for web_template_block
-- ----------------------------
DROP TABLE IF EXISTS "web_template_block";
CREATE TABLE "web_template_block" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "templateId" integer NOT NULL,
  "blockId" integer NOT NULL,
  "templateData" text
);

-- ----------------------------
-- Records of web_template_block
-- ----------------------------
INSERT INTO "web_template_block" VALUES (1, 1, 18, NULL);
INSERT INTO "web_template_block" VALUES (2, 1, 19, NULL);
INSERT INTO "web_template_block" VALUES (3, 1, 20, NULL);
INSERT INTO "web_template_block" VALUES (4, 1, 21, NULL);
INSERT INTO "web_template_block" VALUES (5, 1, 22, NULL);
INSERT INTO "web_template_block" VALUES (7, 2, 18, NULL);
INSERT INTO "web_template_block" VALUES (8, 2, 19, NULL);
INSERT INTO "web_template_block" VALUES (9, 2, 21, NULL);
INSERT INTO "web_template_block" VALUES (10, 2, 22, NULL);
INSERT INTO "web_template_block" VALUES (11, 2, 30, NULL);
INSERT INTO "web_template_block" VALUES (12, 3, 18, NULL);
INSERT INTO "web_template_block" VALUES (13, 3, 19, NULL);
INSERT INTO "web_template_block" VALUES (14, 3, 31, NULL);
INSERT INTO "web_template_block" VALUES (15, 3, 21, NULL);
INSERT INTO "web_template_block" VALUES (16, 3, 22, NULL);
INSERT INTO "web_template_block" VALUES (17, 4, 18, NULL);
INSERT INTO "web_template_block" VALUES (18, 4, 19, NULL);
INSERT INTO "web_template_block" VALUES (19, 4, 32, NULL);
INSERT INTO "web_template_block" VALUES (20, 4, 21, NULL);
INSERT INTO "web_template_block" VALUES (21, 4, 22, NULL);
INSERT INTO "web_template_block" VALUES (22, 5, 18, NULL);
INSERT INTO "web_template_block" VALUES (23, 5, 19, NULL);
INSERT INTO "web_template_block" VALUES (24, 5, 33, NULL);
INSERT INTO "web_template_block" VALUES (25, 5, 21, NULL);
INSERT INTO "web_template_block" VALUES (26, 5, 22, NULL);
INSERT INTO "web_template_block" VALUES (27, 6, 18, NULL);
INSERT INTO "web_template_block" VALUES (28, 6, 19, NULL);
INSERT INTO "web_template_block" VALUES (29, 6, 34, NULL);
INSERT INTO "web_template_block" VALUES (30, 6, 21, NULL);
INSERT INTO "web_template_block" VALUES (31, 6, 22, NULL);
INSERT INTO "web_template_block" VALUES (32, 7, 18, NULL);
INSERT INTO "web_template_block" VALUES (33, 7, 19, NULL);
INSERT INTO "web_template_block" VALUES (34, 7, 35, NULL);
INSERT INTO "web_template_block" VALUES (35, 7, 21, NULL);
INSERT INTO "web_template_block" VALUES (36, 7, 22, NULL);
INSERT INTO "web_template_block" VALUES (37, 8, 18, NULL);
INSERT INTO "web_template_block" VALUES (38, 8, 19, NULL);
INSERT INTO "web_template_block" VALUES (39, 8, 36, NULL);
INSERT INTO "web_template_block" VALUES (40, 8, 21, NULL);
INSERT INTO "web_template_block" VALUES (41, 8, 22, NULL);
INSERT INTO "web_template_block" VALUES (42, 9, 18, NULL);
INSERT INTO "web_template_block" VALUES (43, 9, 19, NULL);
INSERT INTO "web_template_block" VALUES (44, 9, 37, NULL);
INSERT INTO "web_template_block" VALUES (45, 9, 21, NULL);
INSERT INTO "web_template_block" VALUES (46, 9, 22, NULL);

-- ----------------------------
-- Table structure for web_theme
-- ----------------------------
DROP TABLE IF EXISTS "web_theme";
CREATE TABLE "web_theme" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(225) NOT NULL,
  "slug" varchar(500) NOT NULL,
  "description" varchar(500),
  "previewImage" varchar(500)
);

-- ----------------------------
-- Records of web_theme
-- ----------------------------
INSERT INTO "web_theme" VALUES (1, 'Green Ponpes', 'green-ponpes', 'Responsive green template for islamic boarding school website', 'eab84272ac428332def9f3f4f6487900.png');

-- ----------------------------
-- Table structure for yt_upload
-- ----------------------------
DROP TABLE IF EXISTS "yt_upload";
CREATE TABLE "yt_upload" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" varchar(225) NOT NULL,
  "description" varchar(400) NOT NULL,
  "category" varchar,
  "tags" varchar,
  "thumbnail" varchar,
  "video" varchar,
  "createDate" datetime,
  "owner" integer
);

-- ----------------------------
-- Records of yt_upload
-- ----------------------------
INSERT INTO "yt_upload" VALUES (1, 'Udah lama ga sekagum ini sama gadget 😭 - Unboxing Apple Vision Pro', 'Jir.

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

Email untuk kerjasama: davidbrendi88@gmail.com', 'Motivasi', 'kreator,motivasi', 'e7b54d35d55f9d6f35b65206a485e577.webp', 'undefined', NULL, 'sutoyocutez');
INSERT INTO "yt_upload" VALUES (21, 'HP Lipat yang ada logo APPLE 😎', 'Apple Vision Pro apa?

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

Email untuk kerjasama: davidbrendi88@gmail.com', 'uncategory', 'sample', 'ba98d39ad5f118c626bc2589f97033fd.webp', '', NULL, NULL);
INSERT INTO "yt_upload" VALUES (22, 'Samsung lega OPPO ga masukin HP ini di Indonesia 😮‍💨', 'OPPO Flagship 👌

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

Email untuk kerjasama: davidbrendi88@gmail.com', 'uncategory', 'sample', 'eaea0afb39d3a9715db7e255713e6c33.webp', '', NULL, NULL);
INSERT INTO "yt_upload" VALUES (23, 'Hardware GANAS 🤝 Software CERDAS - Review Samsung S24 Ultra Indonesia!', 'No spill spill.

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
', 'uncategory', 'sample', '2d1f28a8ff46c9160ffbe73b1f9efb7e.webp', '', NULL, NULL);
INSERT INTO "yt_upload" VALUES (24, 'Penuh kenikmatan (dan sedikit masalah) - Review iPhone 15 Pro Indonesia!', 'Fans Android pun hepi.

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

Email untuk kerjasama: davidbrendi88@gmail.com', 'uncategory', 'sample', '242a194109c335fd3ef30effefc113af.webp', '', NULL, NULL);
INSERT INTO "yt_upload" VALUES (25, 'Rekomendasi HP TERBAIK buat akhir 2023/ awal 2024!', 'Udah mendingan ga banyak juara bertahan.

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

Email untuk kerjasama: davidbrendi88@gmail.com', 'uncategory', 'sample', 'edfed3fba7da2008ae402e48146ff59b.webp', '', NULL, NULL);
INSERT INTO "yt_upload" VALUES (57, 'Building React Tree Table App with CRUD Features', 'Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. ', 'Sains & Technology', 'react,tree-table,tree-grid', '90254c0ece437df2f08f02405a8f8008.png', 'undefined', NULL, NULL);

-- ----------------------------
-- Table structure for yt_upload_data
-- ----------------------------
DROP TABLE IF EXISTS "yt_upload_data";
CREATE TABLE "yt_upload_data" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uploadId" integer NOT NULL,
  "kind" varchar NOT NULL,
  "content" varchar NOT NULL,
  "createDate" datetime,
  "owner" integer
);

-- ----------------------------
-- Records of yt_upload_data
-- ----------------------------

-- ----------------------------
-- Table structure for yt_upload_tt
-- ----------------------------
DROP TABLE IF EXISTS "yt_upload_tt";
CREATE TABLE "yt_upload_tt" (
  "uploadId" integer NOT NULL,
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" varchar(225) NOT NULL,
  "description" varchar(400) NOT NULL,
  "thumbnail" varchar NOT NULL
);

-- ----------------------------
-- Records of yt_upload_tt
-- ----------------------------
INSERT INTO "yt_upload_tt" VALUES (1, 1, 'Udah lama ga sekagum ini sama gadget 😭 - Unboxing Apple Vision Pro', 'Jir.

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

Email untuk kerjasama: davidbrendi88@gmail.com', '29f6d54ca626d956e638d92caed7b4a1.webp');
INSERT INTO "yt_upload_tt" VALUES (57, 26, 'Building React Tree Table App with CRUD Features (#1709179844411)', 'Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. ', '1709179844411-90254c0ece437df2f08f02405a8f8008.png');
INSERT INTO "yt_upload_tt" VALUES (57, 28, 'Building React Tree Table App with CRUD Features (#1709182576932) (#1709183408804)', 'Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. ', 'cb8f229d3ca076a391d45d5ed5255112.png');
INSERT INTO "yt_upload_tt" VALUES (57, 33, 'How To Create React Tree Table App with CRUD Features ', 'Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. We use Indexed DB as Application Storage. Such a beautiful day Tailwind CSS made easy to cosmetics User Interface with predefine Tailwind CSS Framework Called Preline.', '5acd29f2c86d0f299fdc474972ef2c40.png');
INSERT INTO "yt_upload_tt" VALUES (57, 34, 'How To Build React & Tailwind Tree Table App with Form And CRUD Features', 'Almost easy to create tree table or tree grid using React JS Framework, in this video we will cover how to build example part of common admin panel item that manage menu of the current application menu, which can be applicable to different case. We use Indexed DB as Application Storage. Such a beautiful day Tailwind CSS made easy to cosmetics User Interface with predefine Tailwind CSS Framework Called Preline.', 'bed61d7d61b5c398023ed38a4af3400d.png');

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 12 WHERE name = 'user';

-- ----------------------------
-- Auto increment value for web_block
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 43 WHERE name = 'web_block';

-- ----------------------------
-- Auto increment value for web_company
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 1 WHERE name = 'web_company';

-- ----------------------------
-- Auto increment value for web_contact_person
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 3 WHERE name = 'web_contact_person';

-- ----------------------------
-- Auto increment value for web_menu
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 8 WHERE name = 'web_menu';

-- ----------------------------
-- Auto increment value for web_page
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 1 WHERE name = 'web_page';

-- ----------------------------
-- Auto increment value for web_section_block
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 28 WHERE name = 'web_section_block';

-- ----------------------------
-- Auto increment value for web_site_setting
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 1 WHERE name = 'web_site_setting';

-- ----------------------------
-- Auto increment value for web_template
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 10 WHERE name = 'web_template';

-- ----------------------------
-- Auto increment value for web_template_block
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 46 WHERE name = 'web_template_block';

-- ----------------------------
-- Auto increment value for web_theme
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 1 WHERE name = 'web_theme';

-- ----------------------------
-- Auto increment value for yt_upload
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 57 WHERE name = 'yt_upload';

-- ----------------------------
-- Auto increment value for yt_upload_tt
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 34 WHERE name = 'yt_upload_tt';

PRAGMA foreign_keys = true;
