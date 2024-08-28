<script lang="ts">

</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">

        <h2 class="text-2xl font-bold mb-6">Sign in</h2>
        
        <form method="POST" action="?/signIn"class="flex flex-col gap-4 p-4">
            <input name="email" type="email" placeholder="Email" class="input input-bordered w-full max-w-s">
            <input name="password" type="text" placeholder="Password" class="input input-bordered w-full max-w-s">
            <button formaction="?/signIn" class="btn">Sign in</button>
            <button formaction="?/signUp" class="btn btn-primary" >Sign up</button>
        </form>

    </div>
</div>