import he from 'he'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip'

type TooltipWrapperProps = {
  text: string
  charLimit: number
}

export function TooltipWrapper({ text, charLimit }: TooltipWrapperProps) {
  return (
    <>
      {text.length > charLimit ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {he.decode(text.substring(0, charLimit))}...
            </TooltipTrigger>
            <TooltipContent>{he.decode(text)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        he.decode(text)
      )}
    </>
  )
}
