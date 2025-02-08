<script>
    import "../app.css";
    import Main from "../components/Main.svelte"
    import Header from "../components/Header.svelte"
    import Footer from "../components/Footer.svelte" 

    let y;
    let innerHeight = 0;
    let innerWidth = 0;

    function goTop() {
        document.body.scrollIntoView()
    }
</script>
  
<div>
    <Header y={y}/>
    <slot />
    <Footer />
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />