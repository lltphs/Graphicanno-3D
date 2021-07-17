import boto3

# Access Key ID:
# AKIAUZHOB4SIKXBOEDK3
# Secret Access Key:
# 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

s3 = boto3.resource(
    's3',
    aws_access_key_id='AKIAUZHOB4SIKXBOEDK3',
    aws_secret_access_key='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',
)


def upload_data(bucket_key, url):
    bucket_name = 'thesis-draft'
    # s3.Bucket(bucket_name).put_object(Key=bucket_key, Body=data)
    print(url)
    print(bucket_key)
    s3.meta.client.upload_file(url, bucket_name, bucket_key)
    return f'https://{bucket_name}.s3.us-west-1.amazonaws.com/{bucket_key}'


def upload_volume(user_id, volume):
    bucket_key = f'{user_id}/volume.nrrd'
    return upload_data(bucket_key, volume)


# def upload_anotation(user_id, volume):
#     bucket_key = f'{user_id}/anotation.nrrd'
#     return upload_data(bucket_key, volume)
