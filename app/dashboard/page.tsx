import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, History, TrendingUp, AlertCircle, FileText, Target, Calendar, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
        <p className="text-muted-foreground">Track your nutrition and make healthier choices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 one-ui-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start analyzing your food</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/scan">
                <Button className="w-full h-auto py-6 one-ui-button flex flex-col items-center gap-2">
                  <Camera className="h-8 w-8" />
                  <span className="text-lg">Scan Food</span>
                </Button>
              </Link>
              <Link href="/dashboard/history">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 rounded-full">
                  <History className="h-8 w-8" />
                  <span className="text-lg">View History</span>
                </Button>
              </Link>
              <Link href="/dashboard/health-report">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 rounded-full">
                  <FileText className="h-8 w-8" />
                  <span className="text-lg">Health Report</span>
                </Button>
              </Link>
              <Link href="/dashboard/meal-plan">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 rounded-full">
                  <Calendar className="h-8 w-8" />
                  <span className="text-lg">Meal Plan</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="one-ui-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Today's Progress
            </CardTitle>
            <CardDescription>Nutrition intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <NutritionProgress label="Calories" value={1450} max={2000} unit="kcal" />
              <NutritionProgress label="Protein" value={65} max={120} unit="g" />
              <NutritionProgress label="Carbs" value={180} max={250} unit="g" />
              <NutritionProgress label="Fat" value={45} max={70} unit="g" />
            </div>
          </CardContent>
        </Card>

        <Card className="one-ui-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Weekly Goals
            </CardTitle>
            <CardDescription>Your progress this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <GoalProgress label="Weight Loss" current={1.2} target={2.0} unit="kg" />
              <GoalProgress label="Exercise" current={4} target={5} unit="days" />
              <GoalProgress label="Water Intake" current={6} target={8} unit="glasses" />
            </div>
          </CardContent>
        </Card>

        <Card className="one-ui-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Health Insights
            </CardTitle>
            <CardDescription>Personalized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 p-3 rounded-2xl bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">High sodium intake</p>
                  <p className="text-sm opacity-80">Try to reduce processed foods in your diet.</p>
                </div>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-2xl bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300">
                <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Great protein intake</p>
                  <p className="text-sm opacity-80">You're meeting your protein goals consistently.</p>
                </div>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300">
                <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Health report ready</p>
                  <p className="text-sm opacity-80">Your weekly health analysis is available.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="one-ui-card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Edge AI Features
          </CardTitle>
          <CardDescription>Powered by on-device machine learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-black/20">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Barcode Scanner</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly identify packaged foods and get nutritional information from our offline database.
                </p>
                <Button size="sm" variant="link" className="p-0 h-auto mt-1 text-primary">
                  Try Now
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-black/20">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                <Zap className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Ingredient Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Extract and analyze ingredient lists from packaged foods using on-device OCR.
                </p>
                <Button size="sm" variant="link" className="p-0 h-auto mt-1 text-primary">
                  Try Now
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-black/20">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-800">
                <Zap className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Portion Estimation</h3>
                <p className="text-sm text-muted-foreground">
                  Accurately estimate portion sizes and calorie content using computer vision.
                </p>
                <Button size="sm" variant="link" className="p-0 h-auto mt-1 text-primary">
                  Try Now
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-black/20">
              <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-800">
                <Zap className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Meal Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized meal suggestions based on your dietary preferences and goals.
                </p>
                <Button size="sm" variant="link" className="p-0 h-auto mt-1 text-primary">
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NutritionProgress({
  label,
  value,
  max,
  unit,
}: {
  label: string
  value: number
  max: number
  unit: string
}) {
  const percentage = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>
          {value} / {max} {unit}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function GoalProgress({
  label,
  current,
  target,
  unit,
}: {
  label: string
  current: number
  target: number
  unit: string
}) {
  const percentage = Math.min(100, Math.round((current / target) * 100))

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${percentage >= 100 ? "bg-green-500" : "bg-primary"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
