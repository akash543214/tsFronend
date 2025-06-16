import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type userImageProp = {
    user: {
        username: string
        imageUrl?: string
    }
    editing?: boolean
}
export default function UserAvatar({ user, editing = false }: userImageProp)
{

    return (
        <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {editing && (
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              
            />
          </div>
        )}
      </div>
    );
}