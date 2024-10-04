function ProductReviews({ reviews }) {
    return (
        reviews.map(review => {
            return (
                <>
                    <div>
                        <h4>{review.reviewerName}</h4>
                        <p>{review.comment}</p>
                    </div>
                </>
            )
        })
    )
}

export default ProductReviews