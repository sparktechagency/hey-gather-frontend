'use client'

import { url } from '@/redux/main/server'
import { useGetReviewQuery } from '@/redux/reviewRatingApis'
import Image from 'next/image'
import { FC } from 'react'

// Types
interface ReviewUser {
  _id: string
  name: string
  img: string
}

interface Review {
  _id: string
  user: ReviewUser
  description: string
  rating: number
  createdAt: string
}

interface ReviewCardProps {
  name: string
  date: string
  reviewText: string
  rating: number
  avatar: string
}

const ReviewCard: FC<ReviewCardProps> = ({
  name,
  date,
  reviewText,
  rating,
  avatar,
}) => {
  const starRating = Array.from({ length: 5 }, (_, index) =>
    index < rating ? '★' : '☆'
  ).join('')

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center mb-4">
        <Image
          src={`${url}/${avatar}`}
          alt="avatar"
          className="w-12 h-12 object-cover object-center rounded-full mr-4"
          width={500}
          height={500}
        />
        <div>
          <p className="font-semibold capitalize">{name}</p>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-yellow-500 text-2xl">{starRating}</span>
      </div>
      <p className="text-gray-700">{reviewText}</p>
    </div>
  )
}

const Reviews: FC<{ service: string }> = ({ service }) => {
  const { data, isLoading } = useGetReviewQuery({ service, page: 1 })

  if (isLoading) return <p>Loading reviews...</p>
  if (!data?.success || !data.data.length) return <p>No reviews found.</p>

  return (
    <div className="max-w-2xl mx-auto">
      {data?.data.map((review: Review) => (
        <ReviewCard
          key={review._id}
          name={review.user.name}
          date={new Date(review.createdAt).toLocaleDateString()}
          reviewText={review.description}
          rating={review.rating}
          avatar={review.user.img}
        />
      ))}
    </div>
  )
}

export default Reviews
