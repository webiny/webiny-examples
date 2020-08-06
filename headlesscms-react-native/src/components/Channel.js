import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  List,
  Headline,
  Paragraph,
  Card,
  ActivityIndicator,
  Caption,
  Badge,
} from 'react-native-paper';
import {gql, useQuery} from '@apollo/client';
import {theme} from '../utils/constants';

const LIST_CHANNELS = gql`
  query {
    listChannels {
      data {
        id
        name
        announcements {
          id
          title
          description
          banner
          createdOn
          updatedOn
        }
        createdOn
        updatedOn
      }
    }
  }
`;

export default ({handleNavigate}) => {
  const {loading, error, data} = useQuery(LIST_CHANNELS);

  if (loading) {
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
      <Headline>All Channels</Headline>
      <Caption>Total: {data.listChannels.data.length}</Caption>

      {data.listChannels.data.map(channel => (
        <Card key={channel.id} style={styles.channelListWrapper}>
          <List.Item
            onPress={() => handleNavigate(channel.id)}
            title={channel.name}
            description={`last updated ${new Date(
              channel.updatedOn,
            ).toDateString()}`}
            right={props => (
              <Badge {...props} size={24}>
                {channel.announcements.length}
              </Badge>
            )}
            // style={styles.listItem}
          />
        </Card>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  channelListWrapper: {
    marginVertical: 6,
  },
  announcement: {
    marginVertical: 15,
  },
});
