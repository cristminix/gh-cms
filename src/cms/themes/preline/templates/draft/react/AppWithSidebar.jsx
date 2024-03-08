
 const AppWithSidebar = ({})=>{
    const styles = {  }
    const cls0 = "cls-0 bg-gray-50 dark:bg-slate-900"
		const cls1 = "cls-1 sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700"
		const cls2 = "cls-2 flex items-center py-4"
		const cls3 = "cls-3 text-gray-500 hover:text-gray-600"
		const cls4 = "cls-4 sr-only"
		const cls5 = "cls-5 w-5 h-5"
		const cls6 = "cls-6 ms-3 flex items-center whitespace-nowrap"
		const cls7 = "cls-7 flex items-center text-sm text-gray-800 dark:text-gray-400"
		const cls8 = "cls-8 flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
		const cls9 = "cls-9 text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
		const cls10 = "cls-10 hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
		const cls11 = "cls-11 px-6"
		const cls12 = "cls-12 flex-none text-xl font-semibold dark:text-white"
		const cls13 = "cls-13 hs-accordion-group p-6 w-full flex flex-col flex-wrap"
		const cls14 = "cls-14 space-y-1.5"
		const cls15 = "cls-15 flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
		const cls16 = "cls-16 flex-shrink-0 w-4 h-4"
		const cls17 = "cls-17 hs-accordion"
		const cls18 = "cls-18 hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
		const cls19 = "cls-19 hs-accordion-active:block ms-auto hidden w-4 h-4"
		const cls20 = "cls-20 hs-accordion-active:hidden ms-auto block w-4 h-4"
		const cls21 = "cls-21 hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
		const cls22 = "cls-22 hs-accordion-group ps-3 pt-2"
		const cls23 = "cls-23 pt-2 ps-2"
		const cls24 = "cls-24 flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
		const cls25 = "cls-25 hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden ps-2"
		const cls26 = "cls-26 flex-shrink-0 mt-0.5 w-4 h-4"
		const cls27 = "cls-27 w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
		const cls28 = "cls-28 w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72"
		const cls29 = "cls-29 mb-2 text-sm font-semibold text-blue-600"
		const cls30 = "cls-30 block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white"
		const cls31 = "cls-31 mt-2 text-lg text-gray-800 dark:text-gray-400"
		const cls32 = "cls-32 mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
		const cls33 = "cls-33 w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
		const cls34 = "cls-34 w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

    return <>
    <body className={cls0}> 
     {/*<!-- ========== MAIN CONTENT ========== -->*/} 
     {/*<!-- Sidebar Toggle -->*/} 
     <div className={cls1}> 
       <div className={cls2}> 
         {/*<!-- Navigation Toggle -->*/} 
         <button type="button" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation" className={cls3}> 
           <span className={cls4}> Toggle Navigation </span> 
           <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls5}> 
             <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"> </path> 
           </svg> 
         </button> 
         {/*<!-- End Navigation Toggle -->*/} 
  
         {/*<!-- Breadcrumb -->*/} 
         <ol aria-label="Breadcrumb" className={cls6}> 
           <li className={cls7}> 
            Application Layout
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={cls8}> 
               <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"> </path> 
             </svg> 
           </li> 
           <li aria-current="page" className={cls9}> 
            Dashboard
           </li> 
         </ol> 
         {/*<!-- End Breadcrumb -->*/} 
       </div> 
     </div> 
     {/*<!-- End Sidebar Toggle -->*/} 
  
     {/*<!-- Sidebar -->*/} 
     <div id="application-sidebar" className={cls10}> 
       <div className={cls11}> 
         <a href="#" aria-label="Brand" className={cls12}> Brand </a> 
       </div> 
  
       <nav data-hs-accordion-always-open="" className={cls13}> 
         <ul className={cls14}> 
           <li> 
             <a href="#" className={cls15}> 
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls16}> <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"> </path> <polyline points="9 22 9 12 15 12 15 22"> </polyline> </svg> 
              Dashboard
             </a> 
           </li> 
  
           <li id="users-accordion" className={cls17}> 
             <button type="button" className={cls18}> 
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls16}> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"> </path> <circle cx="9" cy="7" r="4"> </circle> <path d="M22 21v-2a4 4 0 0 0-3-3.87"> </path> <path d="M16 3.13a4 4 0 0 1 0 7.75"> </path> </svg> 
              Users
  
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls19}> <path d="m18 15-6-6-6 6"> </path> </svg> 
  
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls20}> <path d="m6 9 6 6 6-6"> </path> </svg> 
             </button> 
  
             <div id="users-accordion-sub" className={cls21}> 
               <ul data-hs-accordion-always-open="" className={cls22}> 
                 <li id="users-accordion-sub-1" className={cls17}> 
                   <button type="button" className={cls18}> 
                    Sub Menu 1
  
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls19}> <path d="m18 15-6-6-6 6"> </path> </svg> 
  
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls20}> <path d="m6 9 6 6 6-6"> </path> </svg> 
                   </button> 
  
                   <div id="users-accordion-sub-1-child" className={cls21}> 
                     <ul className={cls23}> 
                       <li> 
                         <a href="#" className={cls24}> 
                          Link 1
                         </a> 
                       </li> 
                       <li> 
                         <a href="#" className={cls24}> 
                          Link 2
                         </a> 
                       </li> 
                       <li> 
                         <a href="#" className={cls24}> 
                          Link 3
                         </a> 
                       </li> 
                     </ul> 
                   </div> 
                 </li> 
                 <li id="users-accordion-sub-2" className={cls17}> 
                   <button type="button" className={cls18}> 
                    Sub Menu 2
  
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls19}> <path d="m18 15-6-6-6 6"> </path> </svg> 
  
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls20}> <path d="m6 9 6 6 6-6"> </path> </svg> 
                   </button> 
  
                   <div id="users-accordion-sub-2-child" className={cls25}> 
                     <ul className={cls23}> 
                       <li> 
                         <a href="#" className={cls24}> 
                          Link 1
                         </a> 
                       </li> 
                       <li> 
                         <a href="#" className={cls24}> 
                          Link 2
                         </a> 
                       </li> 
                       <li> 
                         <a href="#" className={cls24}> 
                          Link 3
                         </a> 
                       </li> 
                     </ul> 
                   </div> 
                 </li> 
               </ul> 
             </div> 
           </li> 
  
           <li id="account-accordion" className={cls17}> 
             <button type="button" className={cls18}> 
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls26}> <circle cx="18" cy="15" r="3"> </circle> <circle cx="9" cy="7" r="4"> </circle> <path d="M10 15H6a4 4 0 0 0-4 4v2"> </path> <path d="m21.7 16.4-.9-.3"> </path> <path d="m15.2 13.9-.9-.3"> </path> <path d="m16.6 18.7.3-.9"> </path> <path d="m19.1 12.2.3-.9"> </path> <path d="m19.6 18.7-.4-1"> </path> <path d="m16.8 12.3-.4-1"> </path> <path d="m14.3 16.6 1-.4"> </path> <path d="m20.7 13.8 1-.4"> </path> </svg> 
              Account
  
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls19}> <path d="m18 15-6-6-6 6"> </path> </svg> 
  
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls20}> <path d="m6 9 6 6 6-6"> </path> </svg> 
             </button> 
  
             <div id="account-accordion-sub" className={cls21}> 
               <ul className={cls23}> 
                 <li> 
                   <a href="#" className={cls24}> 
                    Link 1
                   </a> 
                 </li> 
                 <li> 
                   <a href="#" className={cls24}> 
                    Link 2
                   </a> 
                 </li> 
                 <li> 
                   <a href="#" className={cls24}> 
                    Link 3
                   </a> 
                 </li> 
               </ul> 
             </div> 
           </li> 
  
           <li id="projects-accordion" className={cls17}> 
             <button type="button" className={cls18}> 
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls16}> <rect width="20" height="14" x="2" y="7" rx="2" ry="2"> </rect> <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"> </path> </svg> 
              Projects
  
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls19}> <path d="m18 15-6-6-6 6"> </path> </svg> 
  
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls20}> <path d="m6 9 6 6 6-6"> </path> </svg> 
             </button> 
  
             <div id="projects-accordion-sub" className={cls21}> 
               <ul className={cls23}> 
                 <li> 
                   <a href="#" className={cls24}> 
                    Link 1
                   </a> 
                 </li> 
                 <li> 
                   <a href="#" className={cls24}> 
                    Link 2
                   </a> 
                 </li> 
                 <li> 
                   <a href="#" className={cls24}> 
                    Link 3
                   </a> 
                 </li> 
               </ul> 
             </div> 
           </li> 
  
           <li> <a href="#" className={cls27}> 
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls16}> <rect width="18" height="18" x="3" y="4" rx="2" ry="2"> </rect> <line x1="16" x2="16" y1="2" y2="6"> </line> <line x1="8" x2="8" y1="2" y2="6"> </line> <line x1="3" x2="21" y1="10" y2="10"> </line> <path d="M8 14h.01"> </path> <path d="M12 14h.01"> </path> <path d="M16 14h.01"> </path> <path d="M8 18h.01"> </path> <path d="M12 18h.01"> </path> <path d="M16 18h.01"> </path> </svg> 
            Calendar
           </a> </li> 
           <li> <a href="#" className={cls27}> 
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls16}> <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"> </path> <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"> </path> </svg> 
            Documentation
           </a> </li> 
         </ul> 
       </nav> 
     </div> 
     {/*<!-- End Sidebar -->*/} 
  
     {/*<!-- Content -->*/} 
     <div className={cls28}> 
       {/*<!-- Page Heading -->*/} 
       <header> 
         <p className={cls29}> Starter Pages &amp; Examples </p> 
         <h1 className={cls30}> Application Layout: Sidebar using Tailwind CSS </h1> 
         <p className={cls31}> This is a simple application layout with sidebar and header examples using Tailwind CSS. </p> 
         <div className={cls32}> 
           <a href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" target="_blank" className={cls33}> 
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={cls16}> 
               <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"> </path> 
             </svg> 
            Get the source code
           </a> 
           <a href="../examples.html" className={cls34}> 
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className={cls16}> <path d="m15 18-6-6 6-6"> </path> </svg> 
            Back to examples
           </a> 
         </div> 
       </header> 
       {/*<!-- End Page Heading -->*/} 
     </div> 
     {/*<!-- End Content -->*/} 
     {/*<!-- ========== END MAIN CONTENT ========== -->*/} 
   </body>
    </>
 }   

 export default  AppWithSidebar
    