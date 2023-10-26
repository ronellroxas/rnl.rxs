<script lang="ts">
    import { enhance } from "$app/forms";
    import TextInput from "$lib/components/TextInput.svelte";
    import { SnackbarTypeEnum, pushSnackbarState, snackbarStoreState } from "$lib/store";
    import type { ActionData } from "../../$types";

    export let form: ActionData | undefined;
    export let isLoggedIn: boolean;

    function handleSubmitResult(success: boolean | undefined) {
        if (success == undefined) return;

        let snackbar: import("$lib/store").SnackbarProps;
        if (success) {
            snackbar = {
                text: "Welcome back Ronell!",
                type: SnackbarTypeEnum.SUCCESS
            }
            isLoggedIn = true;
        } else {
            snackbar = {
                text: "Failed to login. Please try again!",
                type: SnackbarTypeEnum.ERROR
            }
        }

        pushSnackbarState(snackbar);
    }

    $: handleSubmitResult(form?.isSuccess);
</script>
<form
    class="admin-form"
    use:enhance
    method="POST"
    action="?/login"
    autocomplete="off"
>
    <TextInput name="pwd" placeholder="passkey" secret={true} />
    <button type="submit" class="form-btn"> Enter </button>
</form>

<style>
    .admin-form {
        margin: 1rem;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
    }
</style>