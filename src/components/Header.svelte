<script>
    export let y; 
    
    let tabs = [
        {name: "Projects", link: "#"},
        {name: "About Me", link: "#"}
    ];    
</script>

<header class={'sticky z-[-10] top-0 duration-200 px-6 flex items-center justify-between border border-solid ' + (y > 0 ? 'py-4 tran-40 border-violet-950' : 'py-6 border-transparent')}>
    <!--<h1 id="logo" class="absolute left-1/2 transform -translate-x-1/2">-->
    <h1 class="font-semibold cherish">
        Joel
        Paul
    </h1>
    <div class="sm:flex items-center gap-4  hidden flex-grow justify-end">
        {#each tabs as tab, index}
            <a href="{tab.link}" class="duration-200 hover:text-violet-400">
                <p>{tab.name}</p>
            </a>
        {/each}
    </div>
    <!-- <a href="/" class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950">
        <div class="absolute top-0 right-full w-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200" />
    </a> -->
</header>