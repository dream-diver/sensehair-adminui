<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" no-caret right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt />
                                </div>
                            </span>
                            <div class="dropdown-menu-header">
                                <div class="dropdown-menu-header-inner bg-info">
                                    <div class="menu-header-image opacity-2 dd-header-bg-6"></div>
                                    <div class="menu-header-content text-left">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-3">
                                                    <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt />
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Alina Mcloughlin</div>
                                                    <div class="widget-subheading opacity-8">A short profile description</div>
                                                </div>
                                                <div class="widget-content-right mr-2">
                                                    <button @click="logout" class="btn-pill btn-shadow btn-shine btn btn-focus">Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class=""> -->
                            <!--   <VuePerfectScrollbar class="scrollbar&#45;container" v&#45;once> -->
                            <!--     <ul class="nav flex&#45;column"> -->
                            <!--       <li class="nav&#45;item&#45;header nav&#45;item">My Account</li> -->
                            <!--       <li class="nav&#45;item"> -->
                            <!--         <a href="javascript:void(0);" class="nav&#45;link"> -->
                            <!--           Settings -->
                            <!--         </a> -->
                            <!--       </li> -->
                            <!--     </ul> -->
                            <!--   </VuePerfectScrollbar> -->
                            <!-- </div> -->
                        </b-dropdown>
                    </div>
                    <div class="widget-content-left ml-3 header-user-info">
                        <div class="widget-heading">Alina Mclourd</div>
                        <div class="widget-subheading">VP People Manager</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="header&#45;btn&#45;lg"> -->
        <!--   <button type="button" class="hamburger hamburger&#45;&#45;elastic" -->
        <!--     v&#45;bind:class="{ 'is&#45;active': showDrawerSection }" v&#45;on:click="showDrawerSection = !showDrawerSection"> -->
        <!--     <span class="hamburger&#45;box"> -->
        <!--       <span class="hamburger&#45;inner"></span> -->
        <!--     </span> -->
        <!--   </button> -->
        <!-- </div> -->
        <!--  -->
        <!-- <div class="app&#45;drawer&#45;wrapper" v&#45;bind:class="{ 'drawer&#45;open': showDrawerSection }"> -->
        <!--   <div class="drawer&#45;nav&#45;btn"> -->
        <!--     <button type="button" class="hamburger hamburger&#45;&#45;elastic" -->
        <!--       v&#45;bind:class="{ 'is&#45;active': showDrawerSection }" v&#45;on:click="showDrawerSection = !showDrawerSection"> -->
        <!--       <span class="hamburger&#45;box"> -->
        <!--         <span class="hamburger&#45;inner"></span> -->
        <!--       </span> -->
        <!--     </button> -->
        <!--   </div> -->
        <!--   <div class="drawer&#45;content&#45;wrapper"> -->
        <!--     <VuePerfectScrollbar class="scrollbar&#45;container" v&#45;once> -->
        <!--       <h3 class="drawer&#45;heading">Servers Status</h3> -->
        <!--       <div class="drawer&#45;section"> -->
        <!--         <div class="row"> -->
        <!--           <div class="col"> -->
        <!--             <div class="progress&#45;box"> -->
        <!--               <h4>Server Load 1</h4> -->
        <!--               <vue&#45;circle :progress="21"  :size="104" :reverse="false" line&#45;cap="round" :fill="fill1" -->
        <!--                 empty&#45;fill="rgba(0, 0, 0, .08)" :animation&#45;start&#45;value="0.0" -->
        <!--                 :start&#45;angle="90" insert&#45;mode="append" :thickness="7" :show&#45;percent="true"> -->
        <!--               </vue&#45;circle> -->
        <!--             </div> -->
        <!--           </div> -->
        <!--           <div class="col"> -->
        <!--             <div class="progress&#45;box"> -->
        <!--               <h4>Server Load 2</h4> -->
        <!--               <vue&#45;circle :progress="34" :size="104" :reverse="false" line&#45;cap="round" :fill="fill2" -->
        <!--                 empty&#45;fill="rgba(0, 0, 0, .08)" :animation&#45;start&#45;value="0.0" -->
        <!--                 :start&#45;angle="90" insert&#45;mode="append" :thickness="7" :show&#45;percent="true"> -->
        <!--               </vue&#45;circle> -->
        <!--             </div> -->
        <!--           </div> -->
        <!--           <div class="col"> -->
        <!--             <div class="progress&#45;box"> -->
        <!--               <h4>Server Load 3</h4> -->
        <!--               <vue&#45;circle :progress="16" :size="104" :reverse="false" line&#45;cap="round" :fill="fill3" -->
        <!--                 empty&#45;fill="rgba(0, 0, 0, .08)" :animation&#45;start&#45;value="0.0" -->
        <!--                 :start&#45;angle="90" insert&#45;mode="append" :thickness="7" :show&#45;percent="true"> -->
        <!--               </vue&#45;circle> -->
        <!--             </div> -->
        <!--           </div> -->
        <!--         </div> -->
        <!--         <div class="divider"></div> -->
        <!--         <div class="mt&#45;3"> -->
        <!--           <h5 class="text&#45;center card&#45;title">Live Statistics</h5> -->
        <!--           <div class="text&#45;center"> -->
        <!--             <trend :data="[0, 8, 5, 7, 7, 8, 5, 2, 7, 8]" :gradient="['var(&#45;&#45;success)']" stroke&#45;width="3" -->
        <!--               :height="80" stroke&#45;linecap="round" auto&#45;draw smooth> -->
        <!--             </trend> -->
        <!--           </div> -->
        <!--           <div class="row"> -->
        <!--             <div class="col"> -->
        <!--               <div class="widget&#45;chart p&#45;0"> -->
        <!--                 <div class="widget&#45;chart&#45;content"> -->
        <!--                   <div class="widget&#45;numbers text&#45;warning fsize&#45;3">43</div> -->
        <!--                   <div class="widget&#45;subheading pt&#45;1">Packages</div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="col"> -->
        <!--               <div class="widget&#45;chart p&#45;0"> -->
        <!--                 <div class="widget&#45;chart&#45;content"> -->
        <!--                   <div class="widget&#45;numbers text&#45;danger fsize&#45;3">65</div> -->
        <!--                   <div class="widget&#45;subheading pt&#45;1">Dropped</div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="col"> -->
        <!--               <div class="widget&#45;chart p&#45;0"> -->
        <!--                 <div class="widget&#45;chart&#45;content"> -->
        <!--                   <div class="widget&#45;numbers text&#45;success fsize&#45;3">18</div> -->
        <!--                   <div class="widget&#45;subheading pt&#45;1">Invalid</div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--           </div> -->
        <!--           <div class="divider"></div> -->
        <!--           <div class="text&#45;center mt&#45;2 d&#45;block"> -->
        <!--             <button class="mr&#45;2 border&#45;0 btn&#45;transition btn btn&#45;outline&#45;danger">Escalate Issue</button> -->
        <!--             <button class="border&#45;0 btn&#45;transition btn btn&#45;outline&#45;success">Support Center</button> -->
        <!--           </div> -->
        <!--         </div> -->
        <!--       </div> -->
        <!--       <h3 class="drawer&#45;heading">File Transfers</h3> -->
        <!--       <div class="drawer&#45;section p&#45;0"> -->
        <!--         <div class="files&#45;box"> -->
        <!--           <ul class="list&#45;group list&#45;group&#45;flush"> -->
        <!--             <li class="pt&#45;2 pb&#45;2 pr&#45;2 list&#45;group&#45;item"> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left opacity&#45;6 fsize&#45;2 mr&#45;3 text&#45;primary center&#45;elem"> -->
        <!--                     <font&#45;awesome&#45;icon icon="file&#45;alt" /> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading font&#45;weight&#45;normal">TPSReport.docx</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="btn&#45;icon btn&#45;icon&#45;only btn btn&#45;link btn&#45;sm"> -->
        <!--                       <font&#45;awesome&#45;icon icon="cloud&#45;download&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="pt&#45;2 pb&#45;2 pr&#45;2 list&#45;group&#45;item"> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left opacity&#45;6 fsize&#45;2 mr&#45;3 text&#45;warning center&#45;elem"> -->
        <!--                     <font&#45;awesome&#45;icon icon="file&#45;archive" /> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading font&#45;weight&#45;normal">Latest_photos.zip</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="btn&#45;icon btn&#45;icon&#45;only btn btn&#45;link btn&#45;sm"> -->
        <!--                       <font&#45;awesome&#45;icon icon="cloud&#45;download&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="pt&#45;2 pb&#45;2 pr&#45;2 list&#45;group&#45;item"> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left opacity&#45;6 fsize&#45;2 mr&#45;3 text&#45;danger center&#45;elem"> -->
        <!--                     <font&#45;awesome&#45;icon icon="file&#45;pdf" /> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading font&#45;weight&#45;normal">Annual Revenue.pdf</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="btn&#45;icon btn&#45;icon&#45;only btn btn&#45;link btn&#45;sm"> -->
        <!--                       <font&#45;awesome&#45;icon icon="cloud&#45;download&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="pt&#45;2 pb&#45;2 pr&#45;2 list&#45;group&#45;item"> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left opacity&#45;6 fsize&#45;2 mr&#45;3 text&#45;success center&#45;elem"> -->
        <!--                     <font&#45;awesome&#45;icon icon="file&#45;excel" /> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading font&#45;weight&#45;normal">Analytics_GrowthReport.xls</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="btn&#45;icon btn&#45;icon&#45;only btn btn&#45;link btn&#45;sm"> -->
        <!--                       <font&#45;awesome&#45;icon icon="cloud&#45;download&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--           </ul> -->
        <!--         </div> -->
        <!--       </div> -->
        <!--       <h3 class="drawer&#45;heading">Tasks in Progress</h3> -->
        <!--       <div class="drawer&#45;section p&#45;0"> -->
        <!--         <div class="todo&#45;box"> -->
        <!--           <ul class="todo&#45;list&#45;wrapper list&#45;group list&#45;group&#45;flush"> -->
        <!--             <li class="list&#45;group&#45;item"> -->
        <!--               <div class="todo&#45;indicator bg&#45;warning"></div> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left mr&#45;2"> -->
        <!--                     <div class="custom&#45;checkbox custom&#45;control"> -->
        <!--                       <input type="checkbox" id="exampleCustomCheckbox1266" class="custom&#45;control&#45;input"/> -->
        <!--                       <label class="custom&#45;control&#45;label" for="exampleCustomCheckbox1266">&#38;nbsp;</label> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading"> -->
        <!--                       Wash the car -->
        <!--                       <div class="badge badge&#45;danger ml&#45;2">Rejected</div> -->
        <!--                     </div> -->
        <!--                     <div class="widget&#45;subheading"> -->
        <!--                       <i>Written by Bob</i> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;outline&#45;success"> -->
        <!--                       <font&#45;awesome&#45;icon icon="check" /> -->
        <!--                     </button> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;outline&#45;danger"> -->
        <!--                       <font&#45;awesome&#45;icon icon="trash&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="list&#45;group&#45;item"> -->
        <!--               <div class="todo&#45;indicator bg&#45;focus"></div> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left mr&#45;2"> -->
        <!--                     <div class="custom&#45;checkbox custom&#45;control"> -->
        <!--                       <input type="checkbox" id="exampleCustomCheckbox1666" class="custom&#45;control&#45;input" /> -->
        <!--                       <label class="custom&#45;control&#45;label" for="exampleCustomCheckbox1666">&#38;nbsp;</label> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading">Task with hover dropdown menu</div> -->
        <!--                     <div class="widget&#45;subheading"> -->
        <!--                       <div> -->
        <!--                         By Johnny -->
        <!--                         <div class="badge badge&#45;pill badge&#45;info ml&#45;2">NEW</div> -->
        <!--                       </div> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <div class="d&#45;inline&#45;block"> -->
        <!--                       <b&#45;dropdown toggle&#45;class="btn&#45;icon btn&#45;icon&#45;only border&#45;0 btn&#45;transition" variant="link" no&#45;caret> -->
        <!--                         <span slot="button&#45;content"> -->
        <!--                           <font&#45;awesome&#45;icon icon="ellipsis&#45;h" /> -->
        <!--                         </span> -->
        <!--                         <div> -->
        <!--                           <button type="button" disabled tabindex="&#45;1" class="disabled dropdown&#45;item">Action</button> -->
        <!--                           <button type="button" tabindex="0" class="dropdown&#45;item">Another Action</button> -->
        <!--                           <div tabindex="&#45;1" class="dropdown&#45;divider"></div> -->
        <!--                           <button type="button" tabindex="0" class="dropdown&#45;item">Another Action</button> -->
        <!--                         </div> -->
        <!--                       </b&#45;dropdown> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="list&#45;group&#45;item"> -->
        <!--               <div class="todo&#45;indicator bg&#45;primary"></div> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left mr&#45;2"> -->
        <!--                     <div class="custom&#45;checkbox custom&#45;control"> -->
        <!--                       <input type="checkbox" id="exampleCustomCheckbox4777" class="custom&#45;control&#45;input" /> -->
        <!--                       <label class="custom&#45;control&#45;label" for="exampleCustomCheckbox4777">&#38;nbsp;</label> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left flex2"> -->
        <!--                     <div class="widget&#45;heading">Badge on the right task</div> -->
        <!--                     <div class="widget&#45;subheading">This task has show on hover actions!</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;outline&#45;success"> -->
        <!--                       <font&#45;awesome&#45;icon icon="check" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right ml&#45;3"> -->
        <!--                     <div class="badge badge&#45;pill badge&#45;success">Latest Task</div> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="list&#45;group&#45;item"> -->
        <!--               <div class="todo&#45;indicator bg&#45;info"></div> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left mr&#45;2"> -->
        <!--                     <div class="custom&#45;checkbox custom&#45;control"> -->
        <!--                       <input type="checkbox" id="exampleCustomCheckbox2444" class="custom&#45;control&#45;input" /> -->
        <!--                       <label class="custom&#45;control&#45;label" for="exampleCustomCheckbox2444">&#38;nbsp;</label> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left mr&#45;3"> -->
        <!--                     <div class="widget&#45;content&#45;left"> -->
        <!--                       <img width="42" class="rounded" src="@/assets/images/avatars/1.jpg" alt /> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left"> -->
        <!--                     <div class="widget&#45;heading">Go grocery shopping</div> -->
        <!--                     <div class="widget&#45;subheading">A short description ...</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right widget&#45;content&#45;actions"> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;sm btn&#45;outline&#45;success"> -->
        <!--                       <font&#45;awesome&#45;icon icon="check" /> -->
        <!--                     </button> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;sm btn&#45;outline&#45;danger"> -->
        <!--                       <font&#45;awesome&#45;icon icon="trash&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--             <li class="list&#45;group&#45;item"> -->
        <!--               <div class="todo&#45;indicator bg&#45;success"></div> -->
        <!--               <div class="widget&#45;content p&#45;0"> -->
        <!--                 <div class="widget&#45;content&#45;wrapper"> -->
        <!--                   <div class="widget&#45;content&#45;left mr&#45;2"> -->
        <!--                     <div class="custom&#45;checkbox custom&#45;control"> -->
        <!--                       <input type="checkbox" id="exampleCustomCheckbox3222" class="custom&#45;control&#45;input" /> -->
        <!--                       <label class="custom&#45;control&#45;label" for="exampleCustomCheckbox3222">&#38;nbsp;</label> -->
        <!--                     </div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;left flex2"> -->
        <!--                     <div class="widget&#45;heading">Development Task</div> -->
        <!--                     <div class="widget&#45;subheading">Finish React ToDo List App</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right"> -->
        <!--                     <div class="badge badge&#45;warning mr&#45;2">69</div> -->
        <!--                   </div> -->
        <!--                   <div class="widget&#45;content&#45;right"> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;outline&#45;success"> -->
        <!--                       <font&#45;awesome&#45;icon icon="check" /> -->
        <!--                     </button> -->
        <!--                     <button class="border&#45;0 btn&#45;transition btn btn&#45;outline&#45;danger"> -->
        <!--                       <font&#45;awesome&#45;icon icon="trash&#45;alt" /> -->
        <!--                     </button> -->
        <!--                   </div> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </li> -->
        <!--           </ul> -->
        <!--         </div> -->
        <!--       </div> -->
        <!--       <h3 class="drawer&#45;heading">Urgent Notifications</h3> -->
        <!--       <div class="drawer&#45;section"> -->
        <!--         <div class="notifications&#45;box"> -->
        <!--           <div class="vertical&#45;time&#45;simple vertical&#45;without&#45;time vertical&#45;timeline vertical&#45;timeline&#45;&#45;one&#45;column"> -->
        <!--             <div class="vertical&#45;timeline&#45;item dot&#45;danger vertical&#45;timeline&#45;element"> -->
        <!--               <div> -->
        <!--                 <span class="vertical&#45;timeline&#45;element&#45;icon bounce&#45;in"></span> -->
        <!--                 <div class="vertical&#45;timeline&#45;element&#45;content bounce&#45;in"> -->
        <!--                   <h4 class="timeline&#45;title">All Hands Meeting</h4> -->
        <!--                   <span class="vertical&#45;timeline&#45;element&#45;date"></span> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="vertical&#45;timeline&#45;item dot&#45;warning vertical&#45;timeline&#45;element"> -->
        <!--               <div> -->
        <!--                 <span class="vertical&#45;timeline&#45;element&#45;icon bounce&#45;in"></span> -->
        <!--                 <div class="vertical&#45;timeline&#45;element&#45;content bounce&#45;in"> -->
        <!--                   <p> -->
        <!--                     Yet another one, at -->
        <!--                     <span class="text&#45;success">15:00 PM</span> -->
        <!--                   </p> -->
        <!--                   <span class="vertical&#45;timeline&#45;element&#45;date"></span> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="vertical&#45;timeline&#45;item dot&#45;success vertical&#45;timeline&#45;element"> -->
        <!--               <div> -->
        <!--                 <span class="vertical&#45;timeline&#45;element&#45;icon bounce&#45;in"></span> -->
        <!--                 <div class="vertical&#45;timeline&#45;element&#45;content bounce&#45;in"> -->
        <!--                   <h4 class="timeline&#45;title"> -->
        <!--                     Build the production release -->
        <!--                     <div class="badge badge&#45;danger ml&#45;2">NEW</div> -->
        <!--                   </h4> -->
        <!--                   <span class="vertical&#45;timeline&#45;element&#45;date"></span> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="vertical&#45;timeline&#45;item dot&#45;primary vertical&#45;timeline&#45;element"> -->
        <!--               <div> -->
        <!--                 <span class="vertical&#45;timeline&#45;element&#45;icon bounce&#45;in"></span> -->
        <!--                 <div class="vertical&#45;timeline&#45;element&#45;content bounce&#45;in"> -->
        <!--                   <h4 class="timeline&#45;title"> -->
        <!--                     Something not important -->
        <!--                     <div class="avatar&#45;wrapper mt&#45;2 avatar&#45;wrapper&#45;overlap"> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/1.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/2.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/3.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/4.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/5.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/6.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/7.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <img src="@/assets/images/avatars/8.jpg" alt /> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                       <div class="avatar&#45;icon&#45;wrapper avatar&#45;icon&#45;sm avatar&#45;icon&#45;add"> -->
        <!--                         <div class="avatar&#45;icon"> -->
        <!--                           <i>+</i> -->
        <!--                         </div> -->
        <!--                       </div> -->
        <!--                     </div> -->
        <!--                   </h4> -->
        <!--                   <span class="vertical&#45;timeline&#45;element&#45;date"></span> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="vertical&#45;timeline&#45;item dot&#45;info vertical&#45;timeline&#45;element"> -->
        <!--               <div> -->
        <!--                 <span class="vertical&#45;timeline&#45;element&#45;icon bounce&#45;in"></span> -->
        <!--                 <div class="vertical&#45;timeline&#45;element&#45;content bounce&#45;in"> -->
        <!--                   <h4 class="timeline&#45;title">This dot has an info state</h4> -->
        <!--                   <span class="vertical&#45;timeline&#45;element&#45;date"></span> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--             <div class="vertical&#45;timeline&#45;item dot&#45;dark vertical&#45;timeline&#45;element"> -->
        <!--               <div> -->
        <!--                 <span class="vertical&#45;timeline&#45;element&#45;icon is&#45;hidden"></span> -->
        <!--                 <div class="vertical&#45;timeline&#45;element&#45;content is&#45;hidden"> -->
        <!--                   <h4 class="timeline&#45;title">This dot has a dark state</h4> -->
        <!--                   <span class="vertical&#45;timeline&#45;element&#45;date"></span> -->
        <!--                 </div> -->
        <!--               </div> -->
        <!--             </div> -->
        <!--           </div> -->
        <!--         </div> -->
        <!--       </div> -->
        <!--     </VuePerfectScrollbar> -->
        <!--   </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VueCircle from "vue2-circle-progress";
import Trend from "vuetrend";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faCalendarAlt,
    faTrashAlt,
    faCheck,
    faFileAlt,
    faCloudDownloadAlt,
    faFileExcel,
    faFilePdf,
    faFileArchive,
    faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
    faAngleDown,
    faCalendarAlt,
    faTrashAlt,
    faCheck,
    faFileAlt,
    faCloudDownloadAlt,
    faFileExcel,
    faFilePdf,
    faFileArchive,
    faEllipsisH
);

export default {
    components: {
        VuePerfectScrollbar,
        "font-awesome-icon": FontAwesomeIcon,
        VueCircle,
        trend: Trend
    },
    data: () => ({
        fill1: { gradient: ["#00b09b", "#96c93d"] },
        fill2: { gradient: ["#ff0844", "#ffb199"] },
        fill3: { gradient: ["#f6d365", "#fda085"] },
        showDrawerSection: false
    }),
    mounted(){
    },
    methods: {
        logout () {
            axios.post('api/logout').then( response => {
                this.$store.dispatch('auth/removeAuthToken')
                this.$store.dispatch('auth/removeLoggedInUser')
                this.$router.push({name: 'login'})
            })
        }
    }
};
</script>
