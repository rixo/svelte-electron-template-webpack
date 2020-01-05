<script>
	export let name;

	let x = 0
</script>

<style>
	h1 {
		color: purple;
	}
	button {
		width: 50px;
	}
</style>

<h1>Hello {name}!</h1>

<div>
	<p>{x}</p>
	<button on:click={() => x--}>-</button>
	<button on:click={() => x++}>+</button>
</div>
