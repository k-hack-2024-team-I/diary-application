import {
  Avatar,
  Center,
  HStack,
  Spinner,
  VStack,
  Text,
} from '@channel.io/bezier-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetUserQueryObject } from '@/features/user/queries/useGetUserQueryObject'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'

interface UserInfoProps {
  userId: string
}

export function UserInfo({ userId }: UserInfoProps) {
  const { data } = useSuspenseQuery(useGetUserQueryObject(userId))

  return (
    <VStack>
      <HStack
        as="header"
        align="center"
        justify="between"
        paddingHorizontal={16}
      >
        <Avatar
          name="UserProfilePic"
          avatarUrl={data.avatarUrl}
          size="90"
        />

        <HStack
          spacing={32}
          paddingRight={24}
        >
          {/* TODO(@nabi-chan): 일기 카운트 */}
          <VStack align="center">
            <Text bold>310</Text>
            <Text>일기</Text>
          </VStack>

          {/* TODO(@nabi-chan): 팔로워 카운트 */}
          <VStack align="center">
            <Text bold>0</Text>
            <Text>팔로잉</Text>
          </VStack>

          {/* TODO(@nabi-chan): 팔로잉 카운트 */}
          <VStack align="center">
            <Text bold>0</Text>
            <Text>팔로워</Text>
          </VStack>
        </HStack>
      </HStack>
      <VStack
        as="aside"
        paddingTop={16}
        paddingHorizontal={16}
      >
        <HStack
          spacing={8}
          align="center"
        >
          <Text
            typo="16"
            truncated
            bold
          >
            {data.username}
          </Text>
          <Text
            typo="14"
            color="txt-black-dark"
          >
            {data.gender}
          </Text>
        </HStack>
        <Text
          typo="16"
          color="txt-black-darker"
          truncated={3}
        >
          {data.description}
        </Text>
      </VStack>
    </VStack>
  )
}

export default function SuspenseUserInfo(props: UserInfoProps) {
  return (
    <SSRSafeSuspense
      fallback={
        <Center height={194}>
          <Spinner color="txt-black-darker" />
        </Center>
      }
    >
      <UserInfo {...props} />
    </SSRSafeSuspense>
  )
}