<script lang="ts">
    import type { MessageModel } from "$lib/db";
    import { SnackbarTypeEnum, type SnackbarProps, pushSnackbarState } from "$lib/store";

    let data: MessageModel[] = [];
    

    let selected: string[] = [];
    let selectedCount = 0;

    $: messages = data;
    $: unreadCount = 0;
    $: loading = false;
    $: isError = false;

    const getData = async () => {
        loading = true;
        let response = await fetch("/api/message?orderby=isRead,-created");
        const json = await response.json();
        
        let snackbar: SnackbarProps;

        if (json.isSuccess) {
            data = json.data;

            snackbar = {
                text: "Successfully retrieved messages!",
                type: SnackbarTypeEnum.SUCCESS
            }
            unreadCount = data.filter(d => !d.isRead).length;
            isError = false;
        } else {
            snackbar = {
                text: "There was a problem retrieving the messages, please try again!",
                type: SnackbarTypeEnum.ERROR
            }
            isError = true;
        }

        pushSnackbarState(snackbar);
        
        loading = false;
    }

    getData();

    const display = (text: string | undefined): string => {
        return text == "" || text == undefined ? "N/A" : text;
    }

    const toggleMarkMessage = (id: string, event: Event) => {
        const row = (event.currentTarget as HTMLButtonElement);

        if (!row.classList.contains("unread")) {
            pushSnackbarState({
                text: "Cannot select read messages yet, Coming soon!",
                type: SnackbarTypeEnum.NEUTRAL
            });
            return;
        }
        const isSelected = selected.includes(id);
        if (isSelected) {
            selected = selected.filter(s => s != id);
        } else {
            selected.push(id);
        }
        selectedCount = selected.length;

        row.classList.toggle("row-marked"); 
    }
    
    const handleSelected = async () => {
        for (let id of selected) {
            const response = await fetch(`/api/message?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isRead: true }),
                headers: {
                    'Content-type': "application/json;"
                }
            });

            const result = await response.json();

            if (result.isSuccess) {
                const row = document.querySelector(`button[data-id="${id}"]`);
                row?.classList.toggle("row-marked");
                row?.classList.toggle("unread");
            }
        }

        selected = [];
        selectedCount = 0;
    }

</script>

{#if messages.length > 0 && !loading && !isError}
    <div class="table-msg-ctrl">
        <span>You have {unreadCount} new unread messages!</span>
        <div class="table-actions">
            {#if selectedCount > 0}
                <button class="mark-as-read-btn" on:click={() => handleSelected()}>Mark {selectedCount} message/s as read <i class="mi mi-check icon" /></button>
            {/if}
            <button class="refresh-btn" 
                title="refresh" 
                disabled={loading} 
                on:click={() => getData()}>
                    Refresh 
                    <i class="mi mi-refresh icon" />
            </button>
        </div>
    </div>
    <div class="response-table">
        <div class="table-row table-header">
            <div>Name</div>
            <div>Country</div>
            <div>Message</div>
            <div>Created At</div>
        </div>
        {#each messages as message}
        <button class="table-row 
            {message.isRead ? "": "unread "}
            {selected.includes(message.id) ? "row-marked" : ""}"
            data-id={message.id}
            on:click={(e) => toggleMarkMessage(message.id, e)}
        >
            <div>{display(message.name)}</div>
            <div>{display(message.country)}</div>
            <div>{display(message.message)}</div>
            <div>{display(message.created)}</div>
        </button>
        {/each}
        <div class="table-row table-footer">
            <div style="grid-column: 1/4;">unread: {unreadCount}/{messages.length}</div>
        </div>
    </div>
{:else if loading}
    <div class="table-placeholder">Retrieving data, Please wait!</div>
{:else if isError}
    <div class="table-placeholder">
        Failed to get messages, try again!
        <button class="refresh-btn" 
                title="refresh" 
                disabled={loading} 
                on:click={() => getData()}>
                    Refresh 
                    <i class="mi mi-refresh icon" />
            </button>
    </div>
{:else}
    <div class="table-placeholder">No responses received yet!</div>
{/if}

<style>
    .table-msg-ctrl {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .mark-as-read-btn,
    .refresh-btn {
        color: var(--CURRENT-TEXT-ON-PRIMARY);
        background-color: var(--PRIMARY);
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
    }


    .table-actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 1em;
    }

    .table-placeholder {
        color: var(--PRIMARY);
        min-height: 300px;
        height: 300px;
        aspect-ratio: 1;
        padding: 1em;
        border: 1px solid var(--PRIMARY);
        border-radius: 1rem;
    }
    
    .response-table {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        
    }

    .table-row {
        display: grid;
        grid-template-columns: 0.2fr 0.2fr 0.4fr 0.2fr;
        grid-auto-columns: 1fr;
        grid-auto-rows: 1fr;
        width: 100%;
        border-radius: 0.5rem;
    }

    .table-row:not(.unread) {
        color: var(--NEUTRAL-COLOR);
    }

    .table-row:not(.table-footer) {
        border-bottom: 1px solid var(--LIGHT-NEUTRAL-COLOR);
    }
    
    .table-row:not(.table-header) {
        transition: color 200ms ease-out, background-color 200ms ease-out;
    }

    .table-header {
        background-color: var(--LIGHT-NEUTRAL-COLOR);
    }

    .table-row > div {
        padding: 0.5rem 1rem;
        text-align: left;
    }

    .table-footer {
        font-size: 0.8rem;
        color: var(--NEUTRAL-COLOR);
    }

    .unread {
        font-weight: bold;
        cursor: pointer;
    }

    .unread:hover {
        color: var(--PRIMARY);
    }
</style>