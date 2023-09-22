<script>
	import { enhance } from '$app/forms';
</script>

<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
	<input type="email" name="email" />
	<input type="password" name="password" />
	<button type="submit">Login</button>
</form>

<b>Loading... (charge in 3 seconds)</b>
<code>
	route /user-panel -> in load -> await new Promise((resolve) => setTimeout(resolve, 3000))
</code>
<p>
	It simulates a data load delay because if two users (who are logged in) refresh the page 2 times
	almost at the same time it turns out that one session comes to replace the other, it is as if the
	sessions had crossed.
</p>
