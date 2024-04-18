
 const ChatApp = ({})=>{
    const styles = {  stl0 : { width : "25%" }, stl1 : { width : "78%" }, stl2 : { width : "100%" }, stl3 : { width : "1%" }, }
    const cls0 = "cls-0 relative h-screen"
		const cls1 = "cls-1 max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
		const cls2 = "cls-2 text-center"
		const cls3 = "cls-3 w-28 h-auto mx-auto mb-4"
		const cls4 = "cls-4 fill-blue-600 dark:fill-white"
		const cls5 = "cls-5 stroke-blue-600 dark:stroke-white"
		const cls6 = "cls-6 text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white"
		const cls7 = "cls-7 mt-3 text-gray-600 dark:text-neutral-400"
		const cls8 = "cls-8 mt-16 space-y-5"
		const cls9 = "cls-9 flex gap-x-2 sm:gap-x-4"
		const cls10 = "cls-10 flex-shrink-0 w-[2.375rem] h-[2.375rem] rounded-full"
		const cls11 = "cls-11 bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700"
		const cls12 = "cls-12 font-medium text-gray-800 dark:text-white"
		const cls13 = "cls-13 space-y-1.5"
		const cls14 = "cls-14 mb-1.5 text-sm text-gray-800 dark:text-white"
		const cls15 = "cls-15 list-disc list-outside space-y-1.5 ps-3.5"
		const cls16 = "cls-16 text-sm text-gray-800 dark:text-white"
		const cls17 = "cls-17 max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4"
		const cls18 = "cls-18 grow text-end space-y-3"
		const cls19 = "cls-19 inline-block bg-blue-600 rounded-lg p-4 shadow-sm"
		const cls20 = "cls-20 text-sm text-white"
		const cls21 = "cls-21 flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600"
		const cls22 = "cls-22 text-sm font-medium text-white leading-none"
		const cls23 = "cls-23 grow max-w-[90%] md:max-w-2xl w-full space-y-3"
		const cls24 = "cls-24 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400"
		const cls25 = "cls-25 sm:flex sm:justify-between"
		const cls26 = "cls-26 inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700"
		const cls27 = "cls-27 inline-flex flex-shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
		const cls28 = "cls-28 flex-shrink-0 size-4"
		const cls29 = "cls-29 py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800"
		const cls30 = "cls-30 mt-1 sm:mt-0"
		const cls31 = "cls-31 mt-3"
		const cls32 = "cls-32 p-2 inline-flex justify-center items-center gap-x-1 rounded-lg bg-white/10 border border-transparent font-medium text-gray-100 hover:text-gray-600 hover:bg-white focus:outline-none focus:ring-2 ring-offset-blue-600 focus:ring-white focus:ring-offset-2 text-xs"
		const cls33 = "cls-33 size-3.5"
		const cls34 = "cls-34 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700"
		const cls35 = "cls-35 -m-1.5 overflow-x-auto"
		const cls36 = "cls-36 p-1.5 min-w-full inline-block align-middle"
		const cls37 = "cls-37 min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
		const cls38 = "cls-38 bg-gray-50 dark:bg-neutral-800"
		const cls39 = "cls-39 px-6 py-3 text-start"
		const cls40 = "cls-40 flex items-center gap-x-2"
		const cls41 = "cls-41 text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200"
		const cls42 = "cls-42 divide-y divide-gray-200 dark:divide-neutral-700"
		const cls43 = "cls-43 size-px whitespace-nowrap"
		const cls44 = "cls-44 px-6 py-3"
		const cls45 = "cls-45 flex items-center gap-x-3"
		const cls46 = "cls-46 inline-block size-[38px] rounded-full"
		const cls47 = "cls-47 grow"
		const cls48 = "cls-48 block text-sm font-semibold text-gray-800 dark:text-neutral-200"
		const cls49 = "cls-49 block text-sm text-gray-500 dark:text-neutral-500"
		const cls50 = "cls-50 inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
		const cls51 = "cls-51 size-2.5"
		const cls52 = "cls-52 text-xs text-gray-500 dark:text-neutral-500"
		const cls53 = "cls-53 flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
		const cls54 = "cls-54 flex flex-col justify-center overflow-hidden bg-gray-800 text-xs text-white text-center whitespace-nowrap dark:bg-neutral-200"
		const cls55 = "cls-55 text-sm text-gray-500 dark:text-neutral-500"
		const cls56 = "cls-56 inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
		const cls57 = "cls-57 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-300 dark:bg-neutral-700"
		const cls58 = "cls-58 font-medium text-gray-800 leading-none dark:text-neutral-200"
		const cls59 = "cls-59 mt-3 flex-none min-w-full bg-gray-800 font-mono text-sm p-5 rounded-lg dark:bg-neutral-800"
		const cls60 = "cls-60 text-red-500"
		const cls61 = "cls-61 text-gray-300"
		const cls62 = "cls-62 text-sky-400"
		const cls63 = "cls-63 block"
		const cls64 = "cls-64 ms-5 text-red-500"
		const cls65 = "cls-65 ms-10 text-gray-500 dark:text-neutral-500"
		const cls66 = "cls-66 mb-2.5 me-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400"
		const cls67 = "cls-67 grid grid-cols-2 gap-1 rounded-lg overflow-hidden"
		const cls68 = "cls-68 aspect-w-16 aspect-h-9"
		const cls69 = "cls-69 w-full object-cover"
		const cls70 = "cls-70 text-end"
		const cls71 = "cls-71 mb-2.5 ms-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400"
		const cls72 = "cls-72 flex flex-col justify-end text-start -space-y-px"
		const cls73 = "cls-73 flex items-center gap-x-2 p-3 text-sm bg-white border text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
		const cls74 = "cls-74 w-full flex justify-between truncate"
		const cls75 = "cls-75 me-3 flex-1 w-0 truncate"
		const cls76 = "cls-76 flex items-center gap-x-2 text-gray-500 hover:text-blue-600 whitespace-nowrap dark:text-neutral-500 dark:hover:text-blue-500"
		const cls77 = "cls-77 max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700"
		const cls78 = "cls-78 flex justify-between items-center mb-3"
		const cls79 = "cls-79 inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-blue-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-blue-500"
		const cls80 = "cls-80 py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 text-xs dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
		const cls81 = "cls-81 flex-shrink-0 size-3"
		const cls82 = "cls-82 relative"
		const cls83 = "cls-83 p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
		const cls84 = "cls-84 absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-neutral-900"
		const cls85 = "cls-85 flex justify-between items-center"
		const cls86 = "cls-86 flex items-center"
		const cls87 = "cls-87 inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
		const cls88 = "cls-88 flex items-center gap-x-1"
		const cls89 = "cls-89 inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
		const cls90 = "cls-90 flex-shrink-0 size-3.5"

    return <>
    {/*<!-- Content -->*/} 
 <div className={cls0}> 
     <div className={cls1}> 
       {/*<!-- Title -->*/} 
       <div className={cls2}> 
         <svg width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls3}> 
           <path d="M33.5696 30.2968V10.7968H37.4474V13.1789H37.6229C37.7952 12.7972 38.0445 12.4094 38.3707 12.0155C38.7031 11.6154 39.134 11.283 39.6634 11.0183C40.1989 10.7475 40.8636 10.6121 41.6577 10.6121C42.6918 10.6121 43.6458 10.8829 44.5199 11.4246C45.3939 11.9601 46.0926 12.7695 46.6158 13.8529C47.139 14.93 47.4006 16.2811 47.4006 17.9061C47.4006 19.488 47.1451 20.8237 46.6342 21.9132C46.1295 22.9966 45.4401 23.8183 44.5661 24.3784C43.6982 24.9324 42.7256 25.2094 41.6484 25.2094C40.8852 25.2094 40.2358 25.0832 39.7003 24.8308C39.1709 24.5785 38.737 24.2615 38.3984 23.8799C38.0599 23.4921 37.8014 23.1012 37.6229 22.7073H37.5028V30.2968H33.5696ZM37.4197 17.8877C37.4197 18.7309 37.5367 19.4665 37.7706 20.0943C38.0045 20.7222 38.343 21.2115 38.7862 21.5624C39.2294 21.9071 39.768 22.0794 40.402 22.0794C41.0421 22.0794 41.5838 21.904 42.027 21.5532C42.4702 21.1961 42.8056 20.7037 43.0334 20.0759C43.2673 19.4419 43.3842 18.7125 43.3842 17.8877C43.3842 17.069 43.2704 16.3488 43.0426 15.7272C42.8149 15.1055 42.4794 14.6192 42.0362 14.2683C41.593 13.9175 41.0483 13.7421 40.402 13.7421C39.7618 13.7421 39.2202 13.9113 38.777 14.2499C38.34 14.5884 38.0045 15.0685 37.7706 15.6902C37.5367 16.3119 37.4197 17.0444 37.4197 17.8877ZM49.2427 24.9786V10.7968H53.0559V13.2712H53.2037C53.4622 12.391 53.8961 11.7262 54.5055 11.2769C55.1149 10.8214 55.8166 10.5936 56.6106 10.5936C56.8076 10.5936 57.02 10.6059 57.2477 10.6306C57.4754 10.6552 57.6755 10.689 57.8478 10.7321V14.2222C57.6632 14.1668 57.4077 14.1175 57.0815 14.0745C56.7553 14.0314 56.4567 14.0098 56.1859 14.0098C55.6073 14.0098 55.0903 14.136 54.6348 14.3884C54.1854 14.6346 53.8284 14.9793 53.5638 15.4225C53.3052 15.8657 53.176 16.3765 53.176 16.9551V24.9786H49.2427ZM64.9043 25.2556C63.4455 25.2556 62.1898 24.9601 61.1373 24.3692C60.0909 23.7721 59.2845 22.9289 58.7182 21.8394C58.1519 20.7437 57.8688 19.448 57.8688 17.9523C57.8688 16.4935 58.1519 15.2132 58.7182 14.1114C59.2845 13.0096 60.0816 12.1509 61.1096 11.5354C62.1437 10.9199 63.3563 10.6121 64.7474 10.6121C65.683 10.6121 66.5539 10.7629 67.3603 11.0645C68.1728 11.36 68.8806 11.8062 69.4839 12.4033C70.0932 13.0004 70.5672 13.7513 70.9057 14.6561C71.2443 15.5548 71.4135 16.6074 71.4135 17.8138V18.8941H59.4384V16.4566H67.7111C67.7111 15.8903 67.588 15.3886 67.3418 14.9516C67.0956 14.5146 66.754 14.1729 66.317 13.9267C65.8861 13.6744 65.3844 13.5482 64.812 13.5482C64.2149 13.5482 63.6856 13.6867 63.2239 13.9637C62.7684 14.2345 62.4114 14.6007 62.1529 15.0624C61.8944 15.5179 61.762 16.0257 61.7559 16.5858V18.9033C61.7559 19.605 61.8851 20.2113 62.1437 20.7222C62.4083 21.2331 62.7807 21.627 63.2608 21.904C63.741 22.181 64.3103 22.3195 64.9689 22.3195C65.406 22.3195 65.8061 22.2579 66.1692 22.1348C66.5324 22.0117 66.8432 21.8271 67.1018 21.5808C67.3603 21.3346 67.5572 21.033 67.6927 20.676L71.3304 20.9161C71.1458 21.7901 70.7672 22.5534 70.1948 23.2058C69.6285 23.8522 68.896 24.3569 67.9974 24.7201C67.1048 25.0771 66.0738 25.2556 64.9043 25.2556ZM77.1335 6.06949V24.9786H73.2003V6.06949H77.1335ZM79.5043 24.9786V10.7968H83.4375V24.9786H79.5043ZM81.4801 8.96863C80.8954 8.96863 80.3937 8.77474 79.9752 8.38696C79.5628 7.99302 79.3566 7.52214 79.3566 6.97431C79.3566 6.43265 79.5628 5.96792 79.9752 5.58014C80.3937 5.1862 80.8954 4.98923 81.4801 4.98923C82.0649 4.98923 82.5635 5.1862 82.9759 5.58014C83.3944 5.96792 83.6037 6.43265 83.6037 6.97431C83.6037 7.52214 83.3944 7.99302 82.9759 8.38696C82.5635 8.77474 82.0649 8.96863 81.4801 8.96863ZM89.7415 16.7797V24.9786H85.8083V10.7968H89.5569V13.2989H89.723C90.037 12.4741 90.5632 11.8216 91.3019 11.3415C92.0405 10.8552 92.9361 10.6121 93.9887 10.6121C94.9735 10.6121 95.8322 10.8275 96.5647 11.2584C97.2971 11.6893 97.8665 12.3048 98.2728 13.105C98.679 13.899 98.8821 14.8469 98.8821 15.9487V24.9786H94.9489V16.6505C94.9551 15.7826 94.7335 15.1055 94.2841 14.6192C93.8348 14.1268 93.2162 13.8806 92.4283 13.8806C91.8989 13.8806 91.4311 13.9944 91.0249 14.2222C90.6248 14.4499 90.3109 14.7823 90.0831 15.2193C89.8615 15.6502 89.7477 16.1703 89.7415 16.7797ZM107.665 25.2556C106.206 25.2556 104.951 24.9601 103.898 24.3692C102.852 23.7721 102.045 22.9289 101.479 21.8394C100.913 20.7437 100.63 19.448 100.63 17.9523C100.63 16.4935 100.913 15.2132 101.479 14.1114C102.045 13.0096 102.842 12.1509 103.87 11.5354C104.905 10.9199 106.117 10.6121 107.508 10.6121C108.444 10.6121 109.315 10.7629 110.121 11.0645C110.934 11.36 111.641 11.8062 112.245 12.4033C112.854 13.0004 113.328 13.7513 113.667 14.6561C114.005 15.5548 114.174 16.6074 114.174 17.8138V18.8941H102.199V16.4566H110.472C110.472 15.8903 110.349 15.3886 110.103 14.9516C109.856 14.5146 109.515 14.1729 109.078 13.9267C108.647 13.6744 108.145 13.5482 107.573 13.5482C106.976 13.5482 106.446 13.6867 105.985 13.9637C105.529 14.2345 105.172 14.6007 104.914 15.0624C104.655 15.5179 104.523 16.0257 104.517 16.5858V18.9033C104.517 19.605 104.646 20.2113 104.905 20.7222C105.169 21.2331 105.542 21.627 106.022 21.904C106.502 22.181 107.071 22.3195 107.73 22.3195C108.167 22.3195 108.567 22.2579 108.93 22.1348C109.293 22.0117 109.604 21.8271 109.863 21.5808C110.121 21.3346 110.318 21.033 110.454 20.676L114.091 20.9161C113.907 21.7901 113.528 22.5534 112.956 23.2058C112.389 23.8522 111.657 24.3569 110.758 24.7201C109.866 25.0771 108.835 25.2556 107.665 25.2556Z" fill="currentColor" className={cls4}> </path> 
           <path d="M1 28.9786V15.9786C1 9.35116 6.37258 3.97858 13 3.97858C19.6274 3.97858 25 9.35116 25 15.9786C25 22.606 19.6274 27.9786 13 27.9786H12" stroke="currentColor" strokeWidth="2" className={cls5}> </path> 
           <path d="M5 28.9786V16.1386C5 11.6319 8.58172 7.97858 13 7.97858C17.4183 7.97858 21 11.6319 21 16.1386C21 20.6452 17.4183 24.2986 13 24.2986H12" stroke="currentColor" strokeWidth="2" className={cls5}> </path> 
           <circle cx="13" cy="16" r="5" fill="currentColor" className={cls4}> </circle> 
         </svg> 
  
         <h1 className={cls6}> 
          Welcome to Preline AI
         </h1> 
         <p className={cls7}> 
          Your AI-powered copilot for the web
         </p> 
       </div> 
       {/*<!-- End Title -->*/} 
  
       <ul className={cls8}> 
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           {/*<!-- Card -->*/} 
           <div className={cls11}> 
             <h2 className={cls12}> 
              How can we help?
             </h2> 
             <div className={cls13}> 
               <p className={cls14}> 
                You can ask questions like:
               </p> 
               <ul className={cls15}> 
                 <li className={cls16}> 
                  What&apos;s Preline UI?
                 </li> 
  
                 <li className={cls16}> 
                  How many Starter Pages &amp; Examples are there?
                 </li> 
  
                 <li className={cls16}> 
                  Is there a PRO version?
                 </li> 
               </ul> 
             </div> 
           </div> 
           {/*<!-- End Card -->*/} 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                what&apos;s preline ui?
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.
               </p> 
               <div className={cls13}> 
                 <p className={cls16}> 
                  Here&apos;re some links to get started
                 </p> 
                 <ul> 
                   <li> 
                     <a href="../docs/index.html" className={cls24}> 
                      Installation Guide
                     </a> 
                   </li> 
                   <li> 
                     <a href="../docs/frameworks.html" className={cls24}> 
                      Framework Guides
                     </a> 
                   </li> 
                 </ul> 
               </div> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"> </path> <path d="M21 3v5h-5"> </path> </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                what&apos;s preline ui figma?
               </p> 
               <div className={cls31}> 
                 <button type="button" className={cls32}> 
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <polygon points="5 3 19 12 5 21 5 3"> </polygon> </svg> 
                  Voice message
                 </button> 
               </div> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Preline UI Figma is the largest free design system for Figma, crafted with Tailwind CSS styles and Preline UI components with extra top-notch additions.
               </p> 
               <div className={cls13}> 
                 <p className={cls16}> 
                  With the features like:
                 </p> 
                 <ul className={cls15}> 
                   <li className={cls16}> 
                    12-column Grid System
                   </li> 
  
                   <li className={cls16}> 
                    Easily find UI elements
                   </li> 
  
                   <li className={cls16}> 
                    Variants and Properties
                   </li> 
  
                   <li className={cls16}> 
                    Tailwind CSS Color styles
                   </li> 
  
                   <li className={cls16}> 
                    Auto layout and constraints
                   </li> 
                 </ul> 
               </div> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls33}> 
                       <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"> </path> 
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"> </path> 
                     </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                create a table example with preline using avatars, badges and progress bars
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Hold on a sec...
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             {/*<!-- Table Section -->*/} 
             <div className={cls34}> 
               {/*<!-- Table -->*/} 
               <div className={cls35}> 
                 <div className={cls36}> 
                   <table className={cls37}> 
                     <thead className={cls38}> 
                       <tr> 
                         <th scope="col" className={cls39}> 
                           <div className={cls40}> 
                             <span className={cls41}> 
                              Name
                             </span> 
                           </div> 
                         </th> 
  
                         <th scope="col" className={cls39}> 
                           <div className={cls40}> 
                             <span className={cls41}> 
                              Status
                             </span> 
                           </div> 
                         </th> 
  
                         <th scope="col" className={cls39}> 
                           <div className={cls40}> 
                             <span className={cls41}> 
                              Portfolio
                             </span> 
                           </div> 
                         </th> 
  
                         <th scope="col" className={cls39}> 
                           <div className={cls40}> 
                             <span className={cls41}> 
                              Created
                             </span> 
                           </div> 
                         </th> 
                       </tr> 
                     </thead> 
  
                     <tbody className={cls42}> 
                       <tr> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <img src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=300&amp;h=300&amp;q=80" alt="Image Description" className={cls46}/> 
                               <div className={cls47}> 
                                 <span className={cls48}> Christina Bersh </span> 
                                 <span className={cls49}> christina@site.com </span> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls50}> 
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls51}> 
                                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"> </path> 
                               </svg> 
                              Active
                             </span> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <span className={cls52}> 1/5 </span> 
                               <div role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" className={cls53}> 
                                 <div className={cls54} style={styles.stl0}> </div> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls55}> 28 Dec, 12:12 </span> 
                           </div> 
                         </td> 
                       </tr> 
  
                       <tr> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=300&amp;h=300&amp;q=80" alt="Image Description" className={cls46}/> 
                               <div className={cls47}> 
                                 <span className={cls48}> David Harrison </span> 
                                 <span className={cls49}> david@site.com </span> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls56}> 
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls51}> 
                                 <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"> </path> 
                               </svg> 
                              Warning
                             </span> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <span className={cls52}> 3/5 </span> 
                               <div role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" className={cls53}> 
                                 <div className={cls54} style={styles.stl1}> </div> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls55}> 20 Dec, 09:27 </span> 
                           </div> 
                         </td> 
                       </tr> 
  
                       <tr> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <span className={cls57}> 
                                 <span className={cls58}> A </span> 
                               </span> 
                               <div className={cls47}> 
                                 <span className={cls48}> Anne Richard </span> 
                                 <span className={cls49}> anne@site.com </span> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls50}> 
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls51}> 
                                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"> </path> 
                               </svg> 
                              Active
                             </span> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <span className={cls52}> 5/5 </span> 
                               <div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" className={cls53}> 
                                 <div className={cls54} style={styles.stl2}> </div> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls55}> 18 Dec, 15:20 </span> 
                           </div> 
                         </td> 
                       </tr> 
  
                       <tr> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <img src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=300&amp;h=300&amp;q=80" alt="Image Description" className={cls46}/> 
                               <div className={cls47}> 
                                 <span className={cls48}> Samia Kartoon </span> 
                                 <span className={cls49}> samia@site.com </span> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls50}> 
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls51}> 
                                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"> </path> 
                               </svg> 
                              Active
                             </span> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <div className={cls45}> 
                               <span className={cls52}> 0/5 </span> 
                               <div role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100" className={cls53}> 
                                 <div className={cls54} style={styles.stl3}> </div> 
                               </div> 
                             </div> 
                           </div> 
                         </td> 
                         <td className={cls43}> 
                           <div className={cls44}> 
                             <span className={cls55}> 18 Dec, 15:20 </span> 
                           </div> 
                         </td> 
                       </tr> 
                     </tbody> 
                   </table> 
                 </div> 
               </div> 
               {/*<!-- End Table -->*/} 
             </div> 
             {/*<!-- End Table Section -->*/} 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls33}> 
                       <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"> </path> 
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"> </path> 
                     </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                show me the code
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Of course!
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             <div className={cls59}> <span className={cls60}> &lt; </span> <span className={cls60}> table  <span className={cls61}> class=&quot; <span className={cls62}> min-w-full divide-y divide-gray-200 dark:divide-neutral-700 </span> &quot; </span> <span className={cls60}> &gt; </span> <span className={cls63}> </span>    <span className={cls64}> &lt; </span> <span className={cls60}> thead  <span className={cls61}> class=&quot; <span className={cls62}> bg-gray-50 dark:bg-neutral-800 </span> &quot; </span> <span className={cls60}> &gt; </span> <span className={cls63}> </span> <span className={cls60}>      <span className={cls65}> ... </span> </span> </span> </span> </div> 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls33}> 
                       <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"> </path> 
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"> </path> 
                     </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                quiz me about tailwindcss
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Sure!
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             <div> 
               <button type="button" className={cls66}> 
                Is Tailwind CSS a free library?
               </button> 
               <button type="button" className={cls66}> 
                What&apos;s the latest Tailwind CSS version?
               </button> 
               <button type="button" className={cls66}> 
                Is it a utility-class based?
               </button> 
             </div> 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls33}> 
                       <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"> </path> 
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"> </path> 
                     </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                generate 3-dimensional abstract images
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Here you go...
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             <div className={cls67}> 
               <div className={cls68}> 
                 <img src="https://images.unsplash.com/photo-1677644334825-0eb411012ac0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=3343&amp;q=80" alt="Deep Learning" className={cls69}/> 
               </div> 
               <div className={cls68}> 
                 <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2532&amp;q=80" alt="Deep Learning" className={cls69}/> 
               </div> 
               <div className={cls68}> 
                 <img src="https://images.unsplash.com/photo-1680193895115-b51b4ed5392f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1035&amp;q=80" alt="Deep Learning" className={cls69}/> 
               </div> 
               <div className={cls68}> 
                 <img src="https://images.unsplash.com/photo-1680587590161-3a1dd77a7609?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2532&amp;q=80" alt="Deep Learning" className={cls69}/> 
               </div> 
             </div> 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls33}> 
                       <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"> </path> 
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"> </path> 
                     </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                what&apos;s tailwindcss?
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls9}> 
           <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls10}> 
             <rect width="38" height="38" rx="6" fill="#2563EB"> </rect> 
             <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"> </path> 
             <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"> </ellipse> 
           </svg> 
  
           <div className={cls23}> 
             {/*<!-- Card -->*/} 
             <div className={cls11}> 
               <p className={cls16}> 
                Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables.
               </p> 
               <div className={cls13}> 
                 <ul> 
                   <li> 
                     <a href="#" className={cls24}> 
                      Get started with Tailwind CSS
                     </a> 
                   </li> 
                   <li> 
                     <a href="#" className={cls24}> 
                      Tailwind CSS Installation guide
                     </a> 
                   </li> 
                 </ul> 
               </div> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             {/*<!-- Button Group -->*/} 
             <div> 
               <div className={cls25}> 
                 <div> 
                   <div className={cls26}> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M7 10v12"> </path> <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"> </path> </svg> 
                     </button> 
                     <button type="button" className={cls27}> 
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                     </button> 
                   </div> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M17 14V2"> </path> <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"> </path> </svg> 
                    Copy
                   </button> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <circle cx="18" cy="5" r="3"> </circle> <circle cx="6" cy="12" r="3"> </circle> <circle cx="18" cy="19" r="3"> </circle> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"> </line> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"> </line> </svg> 
                    Share
                   </button> 
                 </div> 
  
                 <div className={cls30}> 
                   <button type="button" className={cls29}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls33}> 
                       <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"> </path> 
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"> </path> 
                     </svg> 
                    New answer
                   </button> 
                 </div> 
               </div> 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div> 
             <div className={cls70}> 
               <button type="button" className={cls71}> 
                What is the use of Tailwind CSS?
               </button> 
               <button type="button" className={cls71}> 
                What is the difference between Tailwind CSS and CSS?
               </button> 
             </div> 
           </div> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
  
         {/*<!-- Chat Bubble -->*/} 
         <li className={cls17}> 
           <div className={cls18}> 
             {/*<!-- Card -->*/} 
             <div className={cls19}> 
               <p className={cls20}> 
                2 files uploaded
               </p> 
             </div> 
             {/*<!-- End Card -->*/} 
  
             <ul className={cls72}> 
               <li className={cls73}> 
                 <div className={cls74}> 
                   <span className={cls75}> 
                    resume_web_ui_developer.csv
                   </span> 
                   <button type="button" className={cls76}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"> </path> <polyline points="7 10 12 15 17 10"> </polyline> <line x1="12" x2="12" y1="15" y2="3"> </line> </svg> 
                    Download
                   </button> 
                 </div> 
               </li> 
               <li className={cls73}> 
                 <div className={cls74}> 
                   <span className={cls75}> 
                    coverletter_web_ui_developer.pdf
                   </span> 
                   <button type="button" className={cls76}> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"> </path> <polyline points="7 10 12 15 17 10"> </polyline> <line x1="12" x2="12" y1="15" y2="3"> </line> </svg> 
                    Download
                   </button> 
                 </div> 
               </li> 
             </ul> 
           </div> 
  
           <span className={cls21}> 
             <span className={cls22}> AZ </span> 
           </span> 
         </li> 
         {/*<!-- End Chat Bubble -->*/} 
       </ul> 
     </div> 
  
     {/*<!-- Search -->*/} 
     <footer className={cls77}> 
       <div className={cls78}> 
         <button type="button" className={cls79}> 
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M5 12h14"> </path> <path d="M12 5v14"> </path> </svg> 
          New chat
         </button> 
  
         <button type="button" className={cls80}> 
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls81}> 
             <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"> </path> 
           </svg> 
          Stop generating
         </button> 
       </div> 
  
       {/*<!-- Input -->*/} 
       <div className={cls82}> 
         <textarea placeholder="Ask me anything..." className={cls83}/> 
  
         {/*<!-- Toolbar -->*/} 
         <div className={cls84}> 
           <div className={cls85}> 
             {/*<!-- Button Group -->*/} 
             <div className={cls86}> 
               {/*<!-- Mic Button -->*/} 
               <button type="button" className={cls87}> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <rect width="18" height="18" x="3" y="3" rx="2"> </rect> <line x1="9" x2="15" y1="15" y2="9"> </line> </svg> 
               </button> 
               {/*<!-- End Mic Button -->*/} 
  
               {/*<!-- Attach Button -->*/} 
               <button type="button" className={cls87}> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"> </path> </svg> 
               </button> 
               {/*<!-- End Attach Button -->*/} 
             </div> 
             {/*<!-- End Button Group -->*/} 
  
             {/*<!-- Button Group -->*/} 
             <div className={cls88}> 
               {/*<!-- Mic Button -->*/} 
               <button type="button" className={cls87}> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls28}> <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"> </path> <path d="M19 10v2a7 7 0 0 1-14 0v-2"> </path> <line x1="12" x2="12" y1="19" y2="22"> </line> </svg> 
               </button> 
               {/*<!-- End Mic Button -->*/} 
  
               {/*<!-- Send Button -->*/} 
               <button type="button" className={cls89}> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls90}> 
                   <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"> </path> 
                 </svg> 
               </button> 
               {/*<!-- End Send Button -->*/} 
             </div> 
             {/*<!-- End Button Group -->*/} 
           </div> 
         </div> 
         {/*<!-- End Toolbar -->*/} 
       </div> 
       {/*<!-- End Input -->*/} 
     </footer> 
     {/*<!-- End Search -->*/} 
   </div> 
   {/*<!-- End Content -->*/}
    </>
 }   

 export default  ChatApp
    