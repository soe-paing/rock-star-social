import { Text, View, ScrollView, Platform } from "react-native";

import { useQuery, useMutation, useQueryClient } from "react-query";

import Item from "../components/Item";

export default function Index() {
	const queryClient = useQueryClient();

	// Detect the platform and switch IP addresses based on it
	const baseURL = Platform.OS === 'ios'
	? 'http://192.168.100.35:8080/posts'  // IP for Mac (iOS)
	: 'http://192.168.100.53:8080/posts'; // IP for Linux (Android)

	const { data, isLoading, error } = useQuery("posts", async () => {
		const res = await fetch(baseURL);
		return res.json();
	});
	const remove = useMutation(
		async id => {
			return fetch(`${baseURL}/${id}`, {
				method: "DELETE",
			});
		},
		{
			onMutate: id => {
				queryClient.setQueryData("posts", old => {
					return old.filter(item => item.id !== id);
				});
			},
		}
	);

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{data.map( item => (
				<Item
					key={item.id}
					item={item}
					remove={remove}
				/>
			))}
		</ScrollView>
	);
}
