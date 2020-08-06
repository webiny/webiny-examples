import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Headline,
  Paragraph,
  Title,
  Card,
  ActivityIndicator,
  Caption,
} from 'react-native-paper';
import {gql, useLazyQuery} from '@apollo/client';
import {theme} from '../utils/constants';

const GET_CHANNELS = gql`
  query getChannel($where: ChannelGetWhereInput!) {
    getChannel(where: $where) {
      data {
        id
        name
        announcements {
          id
          title
          description
          banner
          createdOn
        }
      }
    }
  }
`;

export default ({channelId}) => {
  const [loadChannel, {loading, error, data}] = useLazyQuery(GET_CHANNELS);

  useEffect(() => {
    loadChannel({variables: {where: {id: channelId}}});
  }, [channelId, loadChannel]);

  if (!data || loading) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color={theme.secondary}
      />
    );
  }

  if (error) {
    return <Paragraph>Error! {error.message} </Paragraph>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Headline># {data.getChannel.data.name}</Headline>
      <Caption>Total: {data.getChannel.data.announcements.length}</Caption>
      {data.getChannel.data.announcements.map(announcement => (
        <Card key={announcement.id} style={styles.announcement}>
          <Card.Cover source={{uri: announcement.banner}} />
          <Card.Content>
            <Title>{announcement.title}</Title>
            <Caption>{new Date(announcement.createdOn).toDateString()}</Caption>
            <Paragraph>{announcement.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  channelListWrapper: {
    marginVertical: 15,
  },
  announcement: {
    marginVertical: 15,
  },
});
