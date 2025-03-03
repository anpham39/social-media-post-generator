<script setup lang="ts">
import type { Message, User } from "@/types";

const me = ref<User>({
  id: "user",
  avatar: "/avatar.jpg",
  name: "You",
});
const bot = ref<User>({
  id: "assistant",
  avatar: "/bot.jpg",
  name: "IBot",
});

const users = computed(() => [me.value, bot.value]);

const messages = ref<Message[]>([]);

const usersTyping = ref<User[]>([]);

// transform 5 latest messages in the chat to use for next API call
const apiMessages = computed(() =>
  messages.value.map(msg => ({
    role: msg.userId,
    content: msg.text,
  })).slice(-5)
);

// send messages to Chat API
async function handleNewMessage(message: Message) {
  messages.value.push(message)
  usersTyping.value.push(bot.value)
  console.log('apimsg', apiMessages.value);

  const response = await $fetch("/api/ai", {
    method: "POST",
    body: {
      messages: apiMessages.value,
    }
  })

  if (!response.choices[0].message?.content) return;

  const msg = {
    id: response.id,
    userId: bot.value.id,
    createdAt: new Date(),
    text: response.choices[0].message?.content,
  };
  messages.value.push(msg);
  usersTyping.value = [];
}
</script>
<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
    :usersTyping="usersTyping"
  />
</template>
