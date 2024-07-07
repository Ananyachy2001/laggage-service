import React from 'react'

function Counter() {
  return (
    <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="text-4xl font-bold">15</div>
              <div className="text-lg">Years Experienced</div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="text-4xl font-bold">156</div>
              <div className="text-lg">Happy Clients</div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="text-4xl font-bold">756</div>
              <div className="text-lg">Project Completed</div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="text-4xl font-bold">22</div>
              <div className="text-lg">Active Project</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Counter