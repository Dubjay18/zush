export type TVideoItem = {
    $id: string;
    video: string;
    thumbnail: string;
    title: string;
    creator: {
        $id: string;
        username: string;
        avatar: string;
        email: string;
    }
    avatar: string;
}

export type TVideoItems = Array<TVideoItem>

export type TAllowedFileTypes = "video" | "image"