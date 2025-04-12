import { Code, Database, BarChart, Hexagon, Globe, Server, Cpu, Cloud } from "lucide-react"

interface TechIconProps {
  name: string
  className?: string
}

export function TechIcon({ name, className = "" }: TechIconProps) {
  switch (name.toLowerCase()) {
    case "react":
      return <Code className={className} />
    case "database":
      return <Database className={className} />
    case "bar-chart":
      return <BarChart className={className} />
    case "hexagon":
      return <Hexagon className={className} />
    case "ethereum":
      return <Hexagon className={className} />
    case "web":
      return <Globe className={className} />
    case "server":
      return <Server className={className} />
    case "cpu":
      return <Cpu className={className} />
    case "cloud":
      return <Cloud className={className} />
    default:
      return <Code className={className} />
  }
}